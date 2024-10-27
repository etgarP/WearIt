const clientService = require("../../services/Client/ClientAuthService.js");
const jwt = require("jsonwebtoken");
const secretToken = "even doctor evil won't crack this bad boy";

/*  
    input: username, password
    output: json web token (sent as token)
    authenticate the user and sends back the token for the user
*/
const signInClient = async (req, res) => {
    try {
        const { username, password } = req.body;
        const client = await clientService.authenticate(username, password);
        if (!client) {
            return res.status(401).json("Invalid credentials");
        }
        const token = jwt.sign({ username: client.username }, secretToken);
        return res.status(200).json({ key: token });
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
};

/*  
    input: username, password, ClientInfo
    output: json web token (sent as token)
    authenticate the user and sends back the token for the user
*/
const signUpClient = async (req, res) => {
    try {
        const { username, password } = req.body;
        await clientService.createClient(username, password);
        return res.status(201).json("Client created successfully");
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            // Send a 400 response with a duplicate username error message
            return res.status(400).json("Username already exists");
        }
        return res.status(500).json("Internal Server Error");
    }
};

module.exports = { signInClient, signUpClient };
