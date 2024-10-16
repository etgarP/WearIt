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
        console.log(profile)
        return res.status(200).send(profile);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
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

        return res.status(200).send("Profile saved successfully");
    } catch (error) {
        console.error(error); // Log error for debugging
        return res.status(500).send("Internal Server Error");
    }
};
module.exports = { getProfile, saveProfile };
