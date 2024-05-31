const DesignerProfile = require('../models/DesignerProfile');

/*  
    input: username 
    output: profile of the designer 
*/
const getProfile = async (username) => {
    return await DesignerProfile.findOne({ username });
};

/*  
    input: None 
    output: all desingers profile with info
*/
const getAllProfiles = async () => {
    return await DesignerProfile.find({}).populate({ path: 'designerInfo' }).lean();
    
}; 

/*  
    input: designer username and profile
    output: None
    updates the profile
*/
const saveProfile = async (username, bio, image, name) => {
    await DesignerProfile.findOneAndUpdate(
        { username: username }, // Match the username
        { $set: { bio, image, name } }, // Update the bio field
    );
};

module.exports = { getProfile, saveProfile, getAllProfiles };
