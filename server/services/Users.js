const User = require('../models/Users').User
const UserWithToken = require('../models/Users').UserWithToken

/*
gets a valid username, displayName, profilePic
returns a new user with these details and saves it
*/
const createUser = async (username, displayName, profilePic) => {
    try {
        const user = new User({ username, displayName, profilePic })
        await user.save()
        return
    } catch (error) {
        throw error
    }
}

/*
gets a valid username
returns that user from the database or null
*/
const getUser = async (username) => {
    try {
        const user = await User.findOne({ "username": username }).exec()
        return user
    } catch (error) {
        throw error
    }
}

/*
gets a valid username, token
saves a new userWithToken with these details to the dataBase
or updates 
*/
const createUserWithToken = async (username, token) => {
    try {
        let existingUserWithToken = await getUserWithToken(username)
        if(existingUserWithToken == null){
            const userWithToken = new UserWithToken({ username, token })
            await userWithToken.save()
        }
        else{
            existingUserWithToken.token = token
            await existingUserWithToken.save()
        }
        return
    } catch (error) {
        throw error
    }
}

/*
gets a valid username
returns that userWithToken from the database or null
*/
const getUserWithToken = async (username) => {
    try {
        const userWithToken = await UserWithToken.findOne({ "username": username }).exec()
        return userWithToken
    } catch (error) {
        throw error
    }
}


module.exports = { getUser, createUser, createUserWithToken, getUserWithToken }