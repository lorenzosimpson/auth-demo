const express = require('express')
const router = express.Router()
const Hackathon = require('../database/models/hackathon')
const User = require('../database/models/user');


/**
 * Create a new hackathon
 */
router.post('/', (req, res) => {
    const newHackathon = new Hackathon(req.body)
    newHackathon.save((err, savedHackathon) => {
        if (err) {
            console.log(err)
            return res.status(400).json(err)
        }
        else {
            res.status(201).json(savedHackathon)
        }
    })
})

/**
 * Fetch an array of hackathons that match the search term
 * @param regexQuery - Query string 
 */
router.get('/search', (req, res) => {
    var regexQuery = {
        name: new RegExp(req.query.name, 'i')
      }
    Hackathon.find(regexQuery, (err, hackathons) => {
        if (err) {
            console.log(err)
            return
        }
        else {
            hackathons.length ? res.status(200).json(hackathons) : res.status(200).json([])
        }
    })
})

/**
 *   @returns - array of 3 random hackathons from present and future that a user is NOT associated with
 */
router.get('/explore', (req, res) => {

    const date = new Date()
    if (req.user) {
        const userID = req.user._id
        const date = new Date().getDate()
        User.findById(userID, (err, user) => {
            if (err) {
                res.status(500).json({ error: 'Error finding user' })
            }
            else {
                Hackathon.find(
                    {
                        start_date: { $gte: date },
                        _id: { $nin: user.hackathons },
                        notOrgId: { $ne: ["$organizer_id", userID] },
                    }, (err, hackathons) => {
                        if (err) {
                            res.status(500).json(err)
                        } else {
                            res.status(200).json(hackathons)
                        }
                    })
                    .limit(3)
                    .skip(Math.floor(date) % 3)
            }
        })
    } else {
        Hackathon.aggregate([
            { $match: { start_date: { $gte: date } } },
            { $sample: { size: 3 } }]
            , (err, hackathons) => {
                if (err) {
                    res.status(500).json(err)
                } else {
                    res.status(200).json(hackathons)
                }
            })
    }
})

/**
 * @returns - array of hackathons that the user is not associated with for the explore page
 * if no user_id is found (not logged in, invalid user id), all present and future hackathons returned
 */
router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    if (req.user) {
        const userID = req.user._id;
        User.findById(userID, (err, user) => {
            if (err) {
                console.log('could not find user id, returning all hackathons')
                returnAllHackathons()
            }
            else {
                const date = new Date();
                Hackathon.find({
                    _id: { $nin: user.hackathons },
                    start_date: { $gte: date }
                }, (err, hackathons) => {
                    if (err) res.status(500).json({ error: 'Could not find hackathons that the user is not currently associated with' })
                    else {
                        res.status(200).json(hackathons)
                    }
                })
            }
        })
    } else {
        returnAllFutureHackathons()
    }

    function returnAllFutureHackathons() {
        const date = new Date();
        Hackathon.find({ start_date: { $gte: date } }, (err, hackathons) => {
            if (err) res.status(500).json({ error: 'Could not fetch hackathons' })
            else if (!hackathons.length) {
                res.status(200).json([])
            } else {
                res.status(200).json(hackathons)
            }
        })
    }
})

/**
 * @returns Hackathons that a user is associated with
 */
router.get('/u/:id', (req, res) => {
    const userId = req.params.id;
    console.log('\nUserId', userId)
    User.findById(userId, (err, user) => {
        if (err) {
            console.log('err finding user', err)
            res.status(500).json(err)
        }
        else {
            Hackathon.find({ _id: { $in: user.hackathons } })
                .then(hackathons => res.status(200).json(hackathons))
                .catch(err => res.status(500).json(err))
        }
    })
})

/**
 * @param id - hackathon id to search 
 * @returns a Hackathon object
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Hackathon.findById(id, (err, hackathon) => {
        if (err) {
            res.status(500).json(err)
        }
        if (hackathon === null) return res.status(404).json({ error: 'Hackathon does not exist'})
        res.status(200).json(hackathon)
    })
})



module.exports = router