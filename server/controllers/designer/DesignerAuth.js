const designerService = require('../../services/designer/DesignerAuthService');
const DesignerOrderService = require('../../services/designer/DesignerOrderService');
const jwt = require('jsonwebtoken');
const secretToken = "even doctor evil won't crack this bad boy"

/*  
    input: username, password
    output: json web token (sent as token)
    authenticate the user and sends back the token for the user, and also the orders
*/
const signInDesigner = async (req, res) => {
    try {
        const { username, password } = req.body;
        const designer = await designerService.authenticate(username, password);
        if (!designer) {
            return res.status(401).send("Invalid credentials");
        }
        const token = jwt.sign({ username: designer.username }, secretToken);
        const orders = await DesignerOrderService.getOrders(designer.username);
        return res.status(200).send({ key: token, orders });
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

/*  
    input: username, password, designerInfo, profileInfo
    output: Nothing
    creates a new designer and adds a default profile page
*/
const signUpDesigner = async (req, res) => {
    try {
        const { username, password } = req.body;

        // // Check for required fields in designerInfo
        // if (!designerInfo.name || !designerInfo.gender || !designerInfo.city || !designerInfo.age) {
        //     return res.status(400).send("Missing required designer information");
        // }

        // // Check for required fields in profileInfo
        // if (!profileInfo.name || !profileInfo.image || !profileInfo.specialization) {
        //     return res.status(400).send("Missing required profile information");
        // }
        // designerInfo.username = username
        // profileInfo.username = username

        await designerService.createDesigner(username, password);
        return res.status(201).send("Designer created successfully");
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = { signInDesigner, signUpDesigner };
