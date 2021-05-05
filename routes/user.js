const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')
const Hackathon = require('../database/models/hackathon')



router.post('/', (req, res) => {
    console.log('user signup');

    var { username } = req.body
    username = username.toLowerCase();
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            res.status(500).json(err)
        } else if (user) {
            res.status(400).json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                ...req.body,
                username: req.body.username.toLowerCase()
            })
            newUser.save((err, savedUser) => {
                if (err) return res.status(500).json(err)
                req.login(savedUser, function(error) {
                    if (error) {
                        console.log(error)
                        res.status(500).json('could not authenticate after signup')
                    }
                    res.status(201).json({
                        username: savedUser.username,
                        id: savedUser._id,
                        first_name: savedUser.first_name,
                        last_name: savedUser.last_name,
                        hackathons: savedUser.hackathons,
                    })
                })
            })
        }
    })
})

router.post(
    '/login',
    function (req, res, next) {
        console.log(req.body.username)
        req.body.username = req.body.username.toLowerCase()
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
            var userInfo = {
                username: req.user.username,
                id: req.user._id,
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                hackathons: req.user.hackathons
            };
            console.log("\n User info:", userInfo)
            res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    if (req.user) {
        User.findOne({ username: req.user.username }, (err, user) => {
            if (err) res.status(400).json({ error: 'An error occured. Try clearing cookies and trying again.'})

            const hour = 3600000;
            req.session.cookie.expires = new Date(Date.now() + hour);
            req.session.cookie.maxAge = hour;
            res.json({
                user: {
                    username: req.user.username,
                    id: req.user._id,
                    hackathons: [...user.hackathons],
                    first_name: user.first_name,
                    last_name: user.last_name,
                    hackathons: user.hackathons
                },
            })
        })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

router.post('/register', (req, res) => {
    const { id } = req.body
    Hackathon.findById(id, (err, hackathon) => {
        if (err) {
            console.log('hackathon registration error', err)
        }
        if (!hackathon) {
            res.status(400).json({ error: "that hackathon does not exist, you can't register for it"})
        }
        else {
            User.findById(req.user.id, (err, user) => {
                if (err) {
                    console.log('error getting user')
                }
                if (!user) {
                    console.log('could not find user to associate to hackathon')
                    res.status(400).json({ error: 'could not find user to associate to hackathon' })
                }
                const changes = { $set: { hackathons: [...user.hackathons, id] } }
                User.updateOne({ _id: user.id }, changes)
                    .then(() => {
                        res.status(200).json(`registered ${user.username} for hackathon ${id}`)
                        })
                    .catch(err => {
                            console.log('could not associate user to hackathon', err)
                            res.status(500).json(err)
                    })
            })
        }
    })
})

module.exports = router