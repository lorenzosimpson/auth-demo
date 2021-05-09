const router = require('express').Router()
const Hackathon = require('../database/models/hackathon');
const Project = require('../database/models/project');
const User = require('../database/models/user')


router.post('/join/:project_id', (req, res) => {
    const user_id = req.user._id;
    const { project_id } = req.params;

    User.findById(user_id, (err, user) => {
        if (err) {
            console.log('error signing up for project', err)
            res.status(500).json({ error: 'Could not find user for project'})
        } else {
            Project.findById(project_id, (err, project) => {
                if (err) res.status(400).json({ error: 'Project not found'})
                else {
                    project.signUpForProject(user_id)
                    project.save((err, saved) => {
                        if (err) res.status(500).json({error: err })
                        else {
                            res.status(200).json(saved)
                        }
                    })
                }
            })
        }
    })
})


router.post('/', (req, res) => {
    const user_id = req.user._id

    User.findById(user_id, (err, user) => {
        if (err) {
            console.log('error signing up for project', err)
            res.status(500).json({ error: 'Could not find user for project'})
        }
        else {
            const newProject = new Project(req.body)
            newProject.signUpForProject(user_id)
            newProject.save((err, created) => {
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
        Project.find({ hackathon_id: hackathon_id }, (err, projects) => {
            if (err) console.log(err)
            else res.status(200).json(projects)
        })
    }))
})



module.exports = router