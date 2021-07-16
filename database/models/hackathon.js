const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;
mongoose.Promise = Promise;

const hackathonSchema = new Schema({
    name: { type: String, unique: false, required: true },
    start_date: { type: Date, unique: false, required: true },
    end_date: { type: Date, unique: false, required: true },
    organizer_id: { type: String, unique: false, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    participants: { type: Number, default: 0 },
    project_participants: [String] // array of user ids that are associated with a project
})

/**
 * Verify that new hackathon has all required information including name, start / end dates
 */
hackathonSchema.pre('save', function(next) {
    if (!this.start_date) {
        console.log('models/hackathon.js =====NO START DATE PROVIDED=====')
        next()
    }
    if (!this.end_date) {
        console.log('models/hackathon.js =====NO END DATE PROVIDED=====')
        next()
    }
    if (!this.name) {
        console.log('models/hackathon.js =====NO NAME PROVIDED =====')
        next()
    } else {
        next()
    }
})

/**
 * Functions that get run after saving a document to MongoDB
 * Upon hackathon creation, verify that the organizer is the one creating it
 * Add the hackathon to the list of hackathons the User is associated with
 */
hackathonSchema.post('save', function(hackathon, next) {
        const organizer_id = this.organizer_id;
        User.findById(organizer_id, (err, organizer) => {
            if (err) throw new Error(err)
            else if (organizer_id != organizer._id) {
                console.log('organizer id mismatch', organizer._id, organizer_id)
            }
            else {
                // Add the hackathon to the associated hackathons array
                const changes = { $push: { hackathons: [hackathon._id] } }
                User.updateOne({ _id: organizer_id }, changes, (err, saved) => {
                    if (err) console.log(err)
                    else {
                        next()
                    }
                })
                    
            }
        })
})

const Hackathon = mongoose.model('Hackathon', hackathonSchema);
module.exports = Hackathon;