const clientInfoService = require("../../services/Client/ClientInfoService.js");
const jwt = require("jsonwebtoken");
const authService = require("../../services/Client/ClientAuthService");
const infoService = require("../../services/Client/ClientInfoService.js");
const designerProfileService = require("../../services/designer/DesignerProfileService");
const secretToken = "even doctor evil won't crack this bad boy";

/*  
    input: json web token, 
    output: json web token (sent as token)
    authenticate the user and sends back the token for the user
*/
const changeInfo = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json("Authorization token is missing");
    }
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretToken);
    const newInfo = req.body || {};
    newInfo.username = decoded.username;
    await clientInfoService.setClientInfo(decoded.username, newInfo);
    return res.status(200).json("Info updated successfully");
  } catch (error) {
    if (error.message === "Username mismatch") {
      return res.status(400).json("Username mismatch");
    }
    return res.status(500).json("Internal Server Error");
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
      return res.status(401).json("Authorization token is missing");
    }
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretToken);
    const newInfo = req.body || {};
    newInfo.username = decoded.username;
    const { _id, __v, ...info } = await clientInfoService.getClientInfo(
      decoded.username
    );
    return res.status(200).json(info);
  } catch (error) {
    if (error.message === "Username mismatch") {
      return res.status(400).json("Username mismatch");
    }
    return res.status(500).json("Internal Server Error");
  }
};

/*  
    input: clientInfo, designerInfo
    output: thier match score
*/
function calculateMatchScore(client, designer) {
  let score = 0;
  const maxScore = 100;

  // Weights for each criteria (adjust based on importance)
  const genderWeight = 20;
  const cityWeight = 20;
  const religionWeight = 20;
  const ageWeight = 40; // Give age more weight since it has multiple ranges

  // Match on gender
  if (client.gender === designer.gender) {
    score += genderWeight;
  }

  // Match on city
  if (client.city === designer.city) {
    score += cityWeight;
  }

  // Match on religion
  if (client.religion === designer.religion) {
    score += religionWeight;
  }

  // Age proximity
  const ageDifference = Math.abs(client.age - designer.age);
  if (ageDifference <= 5) {
    score += ageWeight; // Full weight for close age range
  } else if (ageDifference <= 10) {
    score += ageWeight * 0.5; // Half weight for medium age difference
  }

  // Return score out of 100
  return Math.min(score, maxScore);
}

/*  
    input: clientInfo, designerInfos
    output: their match score
*/
const filterTopNMatches = async (client, designers, N) => {
  const designerMatches = designers.map((designer) => {
    const designerInfo = designer.designerInfo;
    designer.designerInfo = null;
    var score = calculateMatchScore(client, designerInfo);
    designer.score = score;
    return designer;
  });
  designerMatches.sort((a, b) => b.score - a.score); // Sort in descending order based on score
  return designerMatches.slice(0, N); // Return the top N matches
};

/*  
    input: jsonwebtoken
    output: top matches
*/
const matches = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretToken);
    const clientProfile = await infoService.getClientInfo(decoded.username);
    const AllDesigners = await designerProfileService.getAllProfiles();
    const result = await filterTopNMatches(clientProfile, AllDesigners, 10);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = { changeInfo, getInfo, matches };
