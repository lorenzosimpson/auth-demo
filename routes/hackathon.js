const express = require('express')
const router = express.Router()
const Hackathon = require('../database/models/hackathon')
const User = require('../database/models/user');

router.post('/', (req, res) => {
    console.log('hackathon creation');

    const newHackathon = new Hackathon(req.body)
    newHackathon.save((err, savedHackathon) => {
        if (err) {
            return res.status(400).json(err)
        }
        else {
            res.status(201).json(savedHackathon)
        }
    })
})

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    Hackathon.find((err, hackathons) => {
        if (err) return res.status(500).json({ error: err })
        if (hackathons.length) {
            return res.json(hackathons)
        }
    })
})

router.get('/u/:id', (req, res) => {
    const userId = req.params.id;
    console.log('\nUserId', userId)
    User.findById(userId, (err, user) => {
        if (err) {
            console.log('err finding user', err)
            res.status(500).json(err)
        }
        else {
            Hackathon.find( { _id: { $in: user.hackathons } })
            .then(hackathons => res.status(200).json(hackathons))
            .catch(err => res.status(500).json(err))
        }
    })
})

module.exports = router