const designerService = require("../../services/designer/DesignerAuthService");
const DesignerOrderService = require("../../services/designer/DesignerOrderService");
const jwt = require("jsonwebtoken");
const secretToken = "even doctor evil won't crack this well differentiated boy";

/*  
    input: username, password
    output: json web token (sent as token), orders for the designer
    authenticate the user and sends back the token for the user, and also the orders
*/
const signInDesigner = async (req, res) => {
    try {
        const { username, password } = req.body;
        const designer = await designerService.authenticate(username, password);
        if (!designer) {
            return res.status(401).json("Invalid credentials");
        }
        const token = jwt.sign({ username: designer.username }, secretToken);
        const orders = await DesignerOrderService.getOrders(designer.username);
        return res.status(200).json({ key: token, orders });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error");
    }
};

/*  
    input: username, password
    output: Nothing
    creates a new designer and adds a default profile page and designer info
*/
const signUpDesigner = async (req, res) => {
    try {
        const { username, password } = req.body;

        await designerService.createDesigner(username, password);
        const token = jwt.sign({ username: username }, secretToken);
        return res.status(200).json({ key: token });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            // Send a 400 response with a duplicate username error message
            return res.status(400).json("Username already exists");
        }
        return res.status(500).json("Internal Server Error");
    }
};

module.exports = { signInDesigner, signUpDesigner };
