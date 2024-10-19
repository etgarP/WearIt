const Client = require('../../models/client/ClientInfo');

/*  
    input: username
    output: ClientInfo
*/
const getClientInfo = async (username) => {
    return await Client.findOne({ username }).lean()
}

/*  
    input: username, clientInfo
    output: None
    updates the info for the
*/
const setClientInfo = async (username, newInfo) => {
    // Remove the _id and __v fields if they are present in newInfo
    const { _id, __v, ...updateInfo } = newInfo;

    const updatedClient = await Client.findOneAndUpdate(
        { username: username },   // Match the username
        { $set: updateInfo },     // Use the $set operator to update the fields
        { new: true, upsert: false } // Return the modified document, do not create if not found
    );
};

module.exports = { getClientInfo, setClientInfo };
