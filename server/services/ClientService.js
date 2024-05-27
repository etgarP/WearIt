const Client = require('../models/ClientInfo');
const LoginInfo = require('../models/LoginInfo');
const bcrypt = require('bcrypt');

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

module.exports = { authenticate, createClient };
