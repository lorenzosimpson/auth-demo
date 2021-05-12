const Hackathon = require('../database/models/hackathon')

module.exports = async (hackathon_id, user_id) => {
    const hackathon = await Hackathon.findById(hackathon_id)
    if (hackathon.organizer_id == user_id) {
        return true
    }
    else {
        return false
    }
}