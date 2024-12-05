const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The login info of a client
const ClientLoginInfo = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// The login info of a designer
const DesignerLoginInfo = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Export both schemas
module.exports = {
    ClientLoginInfo: mongoose.model('ClientLoginInfo', ClientLoginInfo),
    DesignerLoginInfo: mongoose.model('DesignerLoginInfo', DesignerLoginInfo)
};
