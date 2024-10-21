const designerService = require('../../services/designer/DesignerInfoService');
const jwt = require('jsonwebtoken');
const secretToken = "even doctor evil won't crack this bad boy"

/*  
    input: json web token, designerInfo (name, gender, city, age, religion, specialization)
    output: None
*/
const updateDesignerInfo = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretToken);
        const designerInfo = req.body;

        // Include specialization and other fields in the update
        await designerService.updateDesignerInfo(
            decoded.username,
            designerInfo.name,
            designerInfo.gender,
            designerInfo.city,
            designerInfo.age,
            designerInfo.religion || "Non",  // Default to "Non" if religion is not provided
            designerInfo.specialization || [] // Default to an empty array if specialization is not provided
        );

        return res.status(200).json("Designer info updated successfully");
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json("Internal Server Error");
    }
};


/*  
    input: json web token
    output: designer info
*/
const getInfo = async (req, res) => {
    try {
        // Extract the token from the authorization header
        const token = req.headers.authorization.split(' ')[1];

        // Verify the token
        const decoded = jwt.verify(token, secretToken); // Replace secretToken with your actual secret
        // Fetch the designer's info using the decoded username
        const info = await designerService.getInfo(decoded.username);
        // Check if the info was found
        if (!info) {
            return res.status(404).json("Designer info not found");
        }
        const { _id, __v, ...rest } = info.toObject();
        
        return res.status(200).json(rest);
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json("Internal Server Error");
    }
};


module.exports = { updateDesignerInfo, getInfo };
