const router = require('express').Router()
const Hackathon = require('../database/models/hackathon');
const Project = require('../database/models/project');
const User = require('../database/models/user')
const checkProjectApprovalAuthorization = require('../util/checkProjectApprovalAuthorization');

router.post('/join', async (req, res) => {
    const user_id = req.user._id;
    const { project_id } = req.body;
    const project = await Project.findById(project_id);
    const hackathon_id = project.hackathon_id
    const changes = { 
        $addToSet: { hackathons: hackathon_id }} 
    User.updateOne({_id: user_id}, changes, (err, user) => {
        if (err) {
            console.log('error signing up for project', err)
            res.status(500).json({ error: 'Could not find user for project'})
        } else {
            Project.findById(project_id, async (err, project) => {
                if (err) res.status(400).json({ error: 'Project not found'})
                else {
                    const updateHackathon = {
                         $addToSet: { project_participants: user_id } 
                    }
                    try {
                        await Hackathon.findOneAndUpdate({ _id: hackathon_id}, updateHackathon)
                        await project.signUpForProject(user_id);
                    } catch (err) {
                        const { error } = err
                        return res.status(500).json({ error:  error  })
                        
                    }
                    project.save((err, saved) => {
                        if (err) return res.status(500).json({error: err })
                        else {
                            res.status(200).json({
                                message: `Registered ${req.user.username} for project ${project.name}`,
                                project: project
                            })
                        }
                    })
                }
            })
        }
    })
})


router.post('/', async (req, res) => {
    const user_id = req.user._id
    const { hackathon_id } = req.body;
    const changes = { 
        $addToSet: { hackathons: req.body.hackathon_id }} 

    User.findById(user_id, async (err, user) => {
        if (err) {
            console.log('error creating project', err)
            res.status(500).json({ error: 'Could not find user for project'})
        }
        else {
            const newProject = new Project({
                ...req.body,
                creator_id: user_id
            })
            // bypass approval if the organizer creates the project
            const check = await checkProjectApprovalAuthorization(req.body.hackathon_id, user_id)
            if (check) {
                newProject.is_approved = true;
                newProject.is_pending = false;
            }
            
            newProject.save(async(err, created) => {
                if (err) res.status(500).json({error: err })
                else {
                    res.status(201).json(created)
                }
            })
        }
    }) 
})

router.get('/:hackathon_id', (req, res) => {
    const { hackathon_id } = req.params
    Hackathon.findById(hackathon_id, ((err, _) => {
        if (err) return res.status(400).json({ error: 'Could not find hackathon'})
        Project.find({ hackathon_id: hackathon_id, is_approved: true }, (err, projects) => {
            if (err) console.log(err)
            else res.status(200).json(projects)
        })
    }))
})

// Get projects that an organizer has yet to approve
router.get('/pending/:hackathon_id', (req, res) => {
    const { hackathon_id } = req.params;
    Hackathon.findById(hackathon_id, (err, hackathon) => {
        if (err) console.log('error finding hackathon', err)
        else {
            Project.find({ hackathon_id: hackathon_id, is_pending: true }, (err, projects) => {
                if (err) console.log('error finding pending projects', err)
                else {
                    res.status(200).json(projects)
                }
            })
        }
    })
})

router.post('/approve/:project_id', (req, res) => {
    const user_id = req.user._id
    const { project_id } = req.params;

    Project.findById(project_id, async (err, project) => {
        if (err) console.log('project not found', err)
        else {
            const check = await checkProjectApprovalAuthorization(project.hackathon_id, user_id)
            if (!check) {
                res.status(401).json({ error: 'You are not authorized to approve this project. You must be the hackathon organizer'})
            } else {
                project.is_approved = true;
                project.is_pending = false;
                project.save()
                .then(saved =>  res.status(200).json(saved))
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ error: 'Could not approve hackathon' })
                })
            }
        }
    })
})

router.get('/submissions/all', (req, res) => {
    const user_id = req.user._id;
    Project.find({ creator_id: user_id }, (err, projects) => {
        if (err) return res.status(500).json({ error: 'Could not find projects'})
        else {
            return res.status(200).json(projects)
        }
    })
})

router.put('/:project_id', (req, res) => {
    const { project_id } = req.params;
    const changes = req.body;
    Project.findOneAndUpdate({ _id: project_id}, changes, (err, declined) => {
        if (err) return res.status(500).json({ error: 'Could not decline project'})
        else {
            res.status(200).json({ message: 'Declined project ' + project_id })
        }
    })
})

router.get('/submissions/org', (req, res) => {
    const user_id = req.user._id;
    Hackathon.find({ organizer_id: user_id }, (err, hackathons) => {
        if (err) return res.status(500).json({ error: 'Could not find hackathons'})
        else {
            const ids = hackathons.map(h => h._id);
            Project.find({ hackathon_id: { $in: ids }, is_pending: true }, (err, projects) => {
                if (err) return res.status(500).json({ error: 'Could not find projects'})
                else {
                    res.status(200).json(projects)
                }
            })
        }
    })
})

module.exports = router