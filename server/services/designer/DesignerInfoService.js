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
        { username: username.toLowerCase() },  // Convert to lowercase for case-insensitive match
        { $set: { name, gender, city, age, religion, specialization } },
        { new: true, runValidators: true, upsert: true }
    );
};


/*
    gets username and return the matching designerInfo
*/
const getInfo = async (username) => {
    return await DesignerInfo.findOne({ username });
};


module.exports = { updateDesignerInfo, getInfo };
