const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = Promise;

const projectSchema = new Schema({
    name: { type: String, unique: false, required: true },
    hackathon_id: { type: String, unique: false, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    participants: [String],
    is_approved: { type: Boolean, default: false }
})

projectSchema.methods = {
    signUpForProject: function(user_id) {
        this.participants.push(user_id)
    }
}

projectSchema.pre('save', function(next) {
    if (!this.hackathon_id) {
        console.log('models/hackathon.js =====NO HACKATHON_ID PROVIDED=====')
        next()
    }
    if (!this.description) {
        console.log('models/hackathon.js =====NO DESCRIPTION =====')
        next()
    }
    if (!this.name) {
        console.log('models/hackathon.js =====NO NAME PROVIDED =====')
        next()
    } else {
        next()
    }
})

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;