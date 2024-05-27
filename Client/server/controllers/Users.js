const userService = require('../services/Users');
const tokenService = require('../services/Tokens');
const jwt = require('jsonwebtoken');

// adds a user to the database aka registers him
const postUser = async (req, res) => {
    try {
        // Check if required request parameters are present
        const User = req.body;
        if (!(User.username && User.password && User.displayName && User.profilePic)) {
            return res.status(400).send("Invalid request parameters");
        }

        // Check if user already exists
        const existingUser = await userService.getUser(User.username);
        if (existingUser) {
            return res.status(409).send("User already exists");
        }

        // Create the user
        await userService.createUser(User.username, User.displayName, User.profilePic);
        await tokenService.createUserPassname(User.username, User.password, User.displayName, User.profilePic);
        

        // User created successfully
        return res.status(200).send();
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

// gets user data and sends it back to the authenticated user
const getUser = async (req, res) => {
    try {
        // verifing a user
        if (!req.headers.authorization) {
            return res.status(400).send("Bad request")
        }
        let aut = req.headers.authorization
        const words = aut.split(' ')
        const token = words[1]
        jwt.verify(token, 'hemi-hemi-is-never-gonna-give-you-up')
    } catch (error) {
        return res.status(401).send("Unable to authenticate")
    }

    try {
        // sending  the info
        const username = req.params.username;
        const existingUser = await userService.getUser(username)
        if (existingUser) {
            if(req.headers.firebasetoken) {
                await userService.createUserWithToken(username,req.headers.firebasetoken)
            }
            return res.status(200).send(existingUser)
        } else {
            return res.status(404).send("User not found")
        }

    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }

};

module.exports = { postUser, getUser };