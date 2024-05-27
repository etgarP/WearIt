const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserPassName = new Schema({
    username: {
        type: String,
        required: true,
        nullable: true
    },
    password: {
        type: String,
        required: true,
        nullable: true
    },
    displayName: {
        type: String,
        required: true,
        nullable: true
    },
    profilePic: {
        type: String,
        required: true,
        nullable: true
    }
})

module.exports = mongoose.model('UserPassName', UserPassName)