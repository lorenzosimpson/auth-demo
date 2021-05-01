const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;
mongoose.Promise = Promise;

const hackathonSchema = new Schema({
    name: { type: String, unique: false, required: true },
    start_date: { type: Date, unique: false, required: true },
    end_date: { type: Date, unique: false, required: true },
    organizer_id: { type: String, unique: false, required: true },
})

hackathonSchema.methods = {
    assignOrganizer: function(hackathon) {
        const organizer_id = this.organizer_id
        User.findById(organizer_id, (err, organizer) => {
            if (err) console.log(err)
            else if (organizer_id != organizer._id) {
                console.log('organizer id mismatch', organizer._id, organizer_id)
            }
            else {
                // Add the hackathon to the associated hackathons array
                const changes = { $set: { hackathons: [...organizer.hackathons, hackathon._id] } }
                User.updateOne({ _id: organizer_id }, changes)
                    .then(() => {
                        console.log(`Associated ${organizer.username} for hackathon`)
                        })
                    .catch(err => {
                            console.log('could not associate user to hackathon', err)
                    })
            }
        })
    }
}

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
        console.log('models/hackathons.js hackathon in pre-save')
        next()
    }
})

hackathonSchema.post('save', function(doc, next) {
    this.assignOrganizer(doc)
    next()
})

const Hackathon = mongoose.model('Hackathon', hackathonSchema);
module.exports = Hackathon;