const designerService = require('../services/DesignerAuthService');
const jwt = require('jsonwebtoken');
const secretToken = "even doctor evil won't crack this bad boy"

/*  
    input: username, password
    output: json web token (sent as token)
    authenticate the user and sends back the token for the user
*/
const signInDesigner = async (req, res) => {
    try {
        const { username, password } = req.body;
        const designer = await designerService.authenticate(username, password);
        if (!designer) {
            return res.status(401).send("Invalid credentials");
        }
        const token = jwt.sign({ username: designer.username }, secretToken);
        const orders = await designerService.getOrders(designer.username);
        return res.status(200).send({ key: token, orders });
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

/*  
    input: username, password, designerInfo
    output: Nothing
    creates a new designer and adds a default profile page
*/
const signUpDesigner = async (req, res) => {
    try {
        const { username, password, designerInfo } = req.body;
        await designerService.createDesigner(username, password, designerInfo);
        return res.status(201).send("Designer created successfully");
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = { signInDesigner, signUpDesigner };
