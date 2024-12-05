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
    updateInfo.username = username;
    await Client.findOneAndUpdate(
        { username: username },   // Match the username
        { $set: updateInfo },     // Use the $set operator to update the fields
        { new: true, upsert: true } // Return the modified document, do not create if not found
    );
};

// returns the clients image
const getClientImage = async (username) => {
    const clientInfo = await Client.findOne({ username });
    if (!clientInfo) {
        throw new Error('Client not found');
    }
    return clientInfo.image
}   

module.exports = { getClientInfo, setClientInfo, getClientImage };
