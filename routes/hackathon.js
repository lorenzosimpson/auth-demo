const express = require('express')
const router = express.Router()
const Hackathon = require('../database/models/hackathon')
const passport = require('../passport');

router.post('/', (req, res) => {
    console.log('hackathon creation');

    const { name, start_date, end_date } = req.body
    const newHackathon = new Hackathon({
        name: name,
        start_date: start_date,
        end_date: end_date,
    })
    newHackathon.save((err, savedUser) => {
        if (err) {
            return res.json(err)
        }
        else {
            res.json(savedUser)
        }
    })
})


router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

module.exports = router