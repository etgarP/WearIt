const Designer = require('../models/DesignerInfo');
const LoginInfo = require('../models/LoginInfo');
const Order = require('../models/Order');
const DesignerProfile = require('../models/DesignerProfile');
const Design = require('../models/Design');
const bcrypt = require('bcryptjs');

/*  
    input: username, password
    output: user
    authenticate a users password - check 
    its the same as the one in the database and returns the user
*/
const authenticate = async (username, password) => {
    const user = await LoginInfo.findOne({ username, isDesigner: true });
    if (user && await bcrypt.compare(password, user.password)) {
        return user;
    }
    return null;
};

/*  
    input: username, password, designerInfo
    output: none
    signs up a client. uses bcrypt to hash its password into the database
*/
const createDesigner = async (username, password, designerInfo) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const loginInfo = new LoginInfo({ username, password: hashedPassword, isDesigner: true });
    await loginInfo.save();
    const designer = new Designer(designerInfo);
    DesignerProfile.findOneAndUpdate(
        { username }, 
        { username: designerInfo.name, 
            bio: "No bio yet.", reviews: [], }, 
        { upsert: true }
    );
    await designer.save();
};

module.exports = { authenticate, createDesigner };
