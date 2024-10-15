const Client = require('../models/ClientInfo');
const LoginInfo = require('../models/LoginInfo');
const bcrypt = require('bcryptjs');

/*  
    input: username, password
    output: user
    authenticate a users password - check 
    its the same as the one in the database and returns the user
*/
const authenticate = async (username, password) => {
    const user = await LoginInfo.findOne({ username, isDesigner: false });
    if (user && await bcrypt.compare(password, user.password)) {
        return user;
    }
    return null;
};

/*  
    input: username, password, clientInfo
    output: none
    signs up a client. uses bcrypt to hash its password into the database
*/
const createClient = async (username, password, clientInfo) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const loginInfo = new LoginInfo({ username, password: hashedPassword, isDesigner: false });
    await loginInfo.save();
    const client = new Client(clientInfo);
    await client.save();
};

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

    await Client.findOneAndUpdate(
        { username: username }, // Match the username
        { $set: updateInfo },   // Use the $set operator to update the fields
        { new: true, upsert: false } // Return the modified document, do not create if not found
    );
};

module.exports = { authenticate, createClient, getClientInfo, setClientInfo };
