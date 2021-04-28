const express = require('express')
const router = express.Router()
const Hackathon = require('../database/models/hackathon')

router.post('/', (req, res) => {
    console.log('hackathon creation');

    const { name, start_date, end_date } = req.body
    const newHackathon = new Hackathon({
        name: name,
        start_date: start_date,
        end_date: end_date,
    })
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

module.exports = router