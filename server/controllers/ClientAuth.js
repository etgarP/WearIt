const clientService = require('../services/ClientAuthService.js');
const jwt = require('jsonwebtoken');
const secretToken = "even doctor evil won't crack this bad boy"

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
            return res.status(401).send("Invalid credentials");
        }
        const token = jwt.sign({ username: client.username }, secretToken);
        return res.status(200).send({ key: token });
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

/*  
    input: username, password, ClientInfo
    output: json web token (sent as token)
    authenticate the user and sends back the token for the user
*/
const signUpClient = async (req, res) => {
    try {
        const { userName, password, ClientInfo } = req.body;
        await clientService.createClient(userName, password, ClientInfo);
        return res.status(201).send("Client created successfully");
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

/*  
    input: json web token, 
    output: json web token (sent as token)
    authenticate the user and sends back the token for the user
*/
const changeInfo = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretToken);
        const newInfo = req.body.info
        await clientService.setClientInfo(decoded.username, newInfo)
        return res.status(200).send("set info successfully");
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = { signInClient, signUpClient, changeInfo };