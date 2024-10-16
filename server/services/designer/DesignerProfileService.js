const DesignerProfile = require('../../models/desinger/DesignerProfile');

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
    updates the profile, including bio, image, name, specialization, and pricePerItem
*/
const saveProfile = async (username, bio, image, name, specialization, pricePerItem) => {
    await DesignerProfile.findOneAndUpdate(
        { username: username }, // Match the username
        { $set: { bio, image, name, specialization, pricePerItem } }, // Update the fields
    );
};

module.exports = { getProfile, saveProfile, getAllProfiles };
