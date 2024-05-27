const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// later
const MyGroupsSchema = new Schema({
    username: { type: String, required: true, unique: true },
    groupIds: [{ type: Schema.Types.ObjectId, ref: 'Group' }]
});

module.exports = mongoose.model('MyGroups', MyGroupsSchema);
