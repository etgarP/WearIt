const DesignerProfile = require('../models/DesignerProfile');

/*  
    input: username 
    output: profile of the designer 
*/
const getProfile = async (username) => {
    return await DesignerProfile.findOne({ username });
};

/*  
    input: designer username and profile
    output: None
    updates the profile
*/
const saveProfile = async (username, profile) => {
    await DesignerProfile.findOneAndUpdate({ username }, profile, { upsert: true });
};

module.exports = { addReview, getProfile, saveProfile };
