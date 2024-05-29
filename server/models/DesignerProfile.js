const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the designers profile details
const DesignerProfileSchema = new Schema({
    username: { type: String, required: true, unique: true },
    bio: { type: String },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review', unique: true }],
    image: { type: String }
});

module.exports = mongoose.model('DesignerProfile', DesignerProfileSchema);
