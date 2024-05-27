const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the login info of a client/designer
const LoginInfo = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isDesigner: { type: Boolean, required: true }
});

module.exports = mongoose.model('LoginInfo', LoginInfo);
