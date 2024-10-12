const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// to be worked on later
const GroupSchema = new Schema({
    usernames: [{ type: String, required: true }],
    groupId: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Group', GroupSchema);
