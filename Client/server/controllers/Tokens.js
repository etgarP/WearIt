const tokenService = require('../services/Tokens')
const jwt = require('jsonwebtoken')

// gets the jwt token from the username
const getToken = async (username) => {
    const payload = { username }
    const token = jwt.sign(payload, 'hemi-hemi-is-never-gonna-give-you-up')
    return token
}

// gets username and password, checks them and sends a token
const postToken = async (req, res) => {
    try {
        var user = req.body
        // Check if required request parameters are present
        if (!(user.username && user.password)) {
            return res.status(400).send("Invalid request parameters");
        }

        // Check if user already exists
        const existingUser = await tokenService.getUserPassName(user.username, user.password);
        if (existingUser) {
            let token = await getToken(user.username)
            return res.status(200).send(token)
        }
        return res.status(409).send("User doesnt exists");
        // User created successfully
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = { postToken }