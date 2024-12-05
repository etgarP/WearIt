const {DesignerProfile} = require('../../models/desinger/DesignerProfile');

/*  
    input: username 
    output: profile of the designer 
*/
const getProfile = async (username) => {
    return await DesignerProfile.findOne({ username });
};

/**
 * return the imageg of the designer
 */
const getDesignerImage = async (username) => {
    try {
        const designer = await DesignerProfile.findOne({ username });
        return designer ? (designer.image ? designer.image : "") : ""; // Ensure the designer exists before accessing the image
    }
    catch (error) {
        console.error("Error fetching designer profile:", error); // Log the error for better debugging
        return ""; // Optionally, return a default image URL or null if appropriate
    }

};

/*  
    input: None 
    output: all desingers profile with info
*/
const getAllProfiles = async () => {
    return await DesignerProfile.find({}).populate({ path: 'designerInfo' }).lean();
    
}; 

/*  
    input: designer username and profile(username, bio, image, name, specialization, pricePerItem)
    output: None
    updates the profile
*/
const saveProfile = async (username, bio, image, name, specialization, pricePerItem) => {
    await DesignerProfile.findOneAndUpdate(
        { username: username }, // Match the username
        { $set: { bio, image, name, specialization, pricePerItem } }, // Update the fields
        { new: true, runValidators: true, upsert: true }
    );
};

module.exports = { getProfile, saveProfile, getAllProfiles, getDesignerImage };
