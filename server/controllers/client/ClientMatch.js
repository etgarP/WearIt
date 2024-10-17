const clientInfoService = require('../../services/Client/ClientInfoService.js');
const jwt = require('jsonwebtoken');
const authService = require('../../services/Client/ClientAuthService');
const infoService = require('../../services/Client/ClientInfoService.js')
const designerProfileService = require('../../services/designer/DesignerProfileService');
const secretToken = "even doctor evil won't crack this bad boy"

/*  
    input: json web token, 
    output: json web token (sent as token)
    authenticate the user and sends back the token for the user
*/
const changeInfo = async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).send("Authorization token is missing");
        }
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretToken);
        const newInfo = req.body || {};
        newInfo.username = decoded.username
        await clientInfoService.setClientInfo(decoded.username, newInfo);
        return res.status(200).send("Info updated successfully");
    } catch (error) {
        if (error.message === "Username mismatch") {
            return res.status(400).send("Username mismatch");
        }
        return res.status(500).send("Internal Server Error");
    }
};

/*  
    input: json web token, 
    output: json web token (sent as token)
    authenticate the user and sends back the token for the user
*/
const getInfo = async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).send("Authorization token is missing");
        }
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretToken);
        const newInfo = req.body || {};
        newInfo.username = decoded.username
        const {_id, __v, ...info} = await clientInfoService.getClientInfo(decoded.username);
        return res.status(200).send(info);
    } catch (error) {
        if (error.message === "Username mismatch") {
            return res.status(400).send("Username mismatch");
        }
        return res.status(500).send("Internal Server Error");
    }
};

/*  
    input: clientInfo, designerInfo
    output: thier match score
*/
function calculateMatchScore(client, designer) {
    let score = 0;
    // Match on gender
    if (client.gender === designer.gender) {
        score += 10;
    }
    // Match on city
    if (client.city === designer.city) {
        score += 10;
    }
    // Match on religion
    if (client.religion === designer.religion) {
        score += 10;
    }
    // Age proximity
    const ageDifference = Math.abs(client.age - designer.age);
    if (ageDifference <= 5) {
        score += 10;
    } else if (ageDifference <= 10) {
        score += 5;
    }
    return score;
}

/*  
    input: clientInfo, designerInfos
    output: their match score
*/
const filterTopNMatches = async (client, designers, N) => {
    const designerMatches = designers.map(designer => {
        const designerInfo = designer.designerInfo;
        designer.designerInfo = null;
        var score = calculateMatchScore(client, designerInfo)
        designer.score = score
        return designer
    });
    designerMatches.sort((a, b) => b.score - a.score); // Sort in descending order based on score
    return designerMatches.slice(0, N); // Return the top N matches
}

/*  
    input: jsonwebtoken
    output: top matches
*/
const matches = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretToken);
        const clientProfile = await infoService.getClientInfo(decoded.username)
        const AllDesigners = await designerProfileService.getAllProfiles()
        const result = await filterTopNMatches(clientProfile, AllDesigners, 10)
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = { changeInfo, getInfo, matches }