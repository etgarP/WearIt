const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = new Schema({
    username: {
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

const UserWithToken = new Schema({
    username: {
        type: String,
        required: true,
        nullable: true
    },
    token: {
        type: String,
        required: true,
        nullable: true
    }
})

module.exports = {
    User: mongoose.model('User', User),
    UserWithToken: mongoose.model('UserWithToken', UserWithToken)
}