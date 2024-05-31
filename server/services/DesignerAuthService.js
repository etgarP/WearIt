const Designer = require('../models/DesignerInfo');
const LoginInfo = require('../models/LoginInfo');
const DesignerProfile = require('../models/DesignerProfile');
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
    signs up a Designer. uses bcrypt to hash its password into the database.
    adds a designer profile as well.
*/
const createDesigner = async (username, password, designerInfo) => {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the login info
    const loginInfo = new LoginInfo({ username, password: hashedPassword, isDesigner: true });
    await loginInfo.save();

    // Save the designer info and retrieve the _id
    const designer = new Designer(designerInfo);
    const savedDesigner = await designer.save();
    const designerId = savedDesigner._id; // Get the _id of the saved designer

    // Update or create the designer profile
    await DesignerProfile.findOneAndUpdate(
        { username },
        {
            username,
            name: designerInfo.name,
            bio: "No bio yet.",
            image: designerInfo.image,
            designerInfo: designerId // Use the retrieved _id here
        },
        { upsert: true }
    );
}

module.exports = { authenticate, createDesigner };
