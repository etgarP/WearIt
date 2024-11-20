const Client = require("../../models/client/ClientInfo");
const { ClientLoginInfo } = require("../../models/LoginInfo");
const bcrypt = require("bcryptjs");

/*  
    input: username, password
    output: user
    authenticate a users password - check 
    its the same as the one in the database and returns the user
*/
const authenticate = async (username, password) => {
<<<<<<< HEAD
    const user = await ClientLoginInfo.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        return user;
    }
    return null;
=======
  const user = await ClientLoginInfo.findOne({ username });
  console.log(user);
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }
  return null;
>>>>>>> 84e06fbadc161fdcb970ce8ea90acd893d9dd8af
};

/*  
    input: username, password, clientInfo
    output: none
    signs up a client. uses bcrypt to hash its password into the database
*/
const createClient = async (username, password) => {
<<<<<<< HEAD
    const hashedPassword = await bcrypt.hash(password, 10);
    const loginInfo = new ClientLoginInfo({ username, password: hashedPassword });
    await loginInfo.save();
=======
  const hashedPassword = await bcrypt.hash(password, 10);
  const loginInfo = new ClientLoginInfo({
    username,
    password: hashedPassword,
    isDesigner: false,
  });
  await loginInfo.save();
>>>>>>> 84e06fbadc161fdcb970ce8ea90acd893d9dd8af
};

module.exports = { authenticate, createClient };
