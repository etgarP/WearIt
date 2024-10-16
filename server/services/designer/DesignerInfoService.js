const Designer = require('../../models/desinger/DesignerInfo');
const LoginInfo = require('../../models/LoginInfo');
const DesignerProfile = require('../../models/desinger/DesignerProfile');
const DesignerInfo = require('../../models/desinger/DesignerInfo');
const bcrypt = require('bcryptjs');

/*  
    input: designer username and designerInfo (name, gender, city, age, religion, specialization)
    output: None
    updates the designer info
*/
const updateDesignerInfo = async (username, name, gender, city, age, religion, specialization) => {
    await DesignerInfo.findOneAndUpdate(
        { username: username }, // Match the username
        { $set: { name, gender, city, age, religion, specialization } }, // Update the designer info fields
        { new: true, runValidators: true } // Return the updated document, ensure valid input
    );
};

/*
    gets username and return the matching designerInfo
*/
const getInfo = async (username) => {
    return await DesignerInfo.findOne({ username });
};


module.exports = { updateDesignerInfo, getInfo };
