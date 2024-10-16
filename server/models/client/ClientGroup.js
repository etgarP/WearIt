const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// to be worked on later
const MyGroupsSchema = new Schema({
    username: { type: String, required: true, unique: true },
    groupIds: [{ type: Schema.Types.ObjectId, ref: 'Group' }]
});

module.exports = {
    MyGroups: mongoose.model('MyGroups', MyGroupsSchema)
};
