const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = Promise;

/**
 * @param creator_id - the User submitting the project idea (creating the project)
 */
const projectSchema = new Schema({
    name: { type: String, unique: false, required: true },
    hackathon_id: { type: String, unique: false, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    participants: [String],
    is_approved: { type: Boolean, default: false },
    is_pending: { type: Boolean, default: true },
    creator_id: { type: String, required: true }
})

projectSchema.methods = {
    signUpForProject: function(user_id) {
        return new Promise((resolve, reject) => {
            // If the User is not already participating in the Project, allow them to sign up 
            if (!this.participants.includes(user_id)) {
                this.participants.push(user_id)
                resolve({ message: 'Signed up for project'})
            } else {
                reject({ error: 'User is already participating in this project' })
            }
        })
    }
}
/**
 * Verify that all required Project fields are provided
 */
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