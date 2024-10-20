const designerService = require('../../services/designer/DesignerProfileService');
const jwt = require('jsonwebtoken');
const secretToken = "even doctor evil won't crack this bad boy"

/*  
    input: json web token
    output: profile
*/
const getProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretToken);
        const profile = await designerService.getProfile(decoded.username);
        const {_id, __v, ...adjustedProfile} = profile.toObject()
        return res.status(200).json(adjustedProfile);
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
};

/*  
    input: json web token, profile(bio, image, name, specialization, pricePerItem)
    output: None
*/
const saveProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretToken);
        const profile = req.body;

        // Include specialization and pricePerItem in the update
        await designerService.saveProfile(
            decoded.username,
            profile.bio,
            profile.image,
            profile.name,
            profile.specialization,  // Add specialization
            profile.pricePerItem      // Add pricePerItem
        );

        return res.status(200).json("Profile saved successfully");
    } catch (error) {
        console.error(error); // Log error for debugging
        return res.status(500).json("Internal Server Error");
    }
};
module.exports = { getProfile, saveProfile };
