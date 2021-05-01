const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = Promise;

const hackathonSchema = new Schema({
    name: { type: String, unique: false, required: true },
    start_date: { type: Date, unique: false, required: true },
    end_date: { type: Date, unique: false, required: true },
    organizer_id: { type: String, unique: false, required: true },
})

hackathonSchema.methods = {

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

const Hackathon = mongoose.model('Hackathon', hackathonSchema);
module.exports = Hackathon;