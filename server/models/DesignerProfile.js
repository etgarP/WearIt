const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the designers profile details
const DesignerProfileSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    bio: { type: String },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    image: { type: String },
    designerInfo: { type: Schema.Types.ObjectId, ref: 'DesignerInfo' }
});

module.exports = mongoose.model('DesignerProfile', DesignerProfileSchema);
