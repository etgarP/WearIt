const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DesignerProfileSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    bio: { type: String, maxlength: 250 },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    image: { type: String },
    pricePerItem: { type: Number },
    specialization: { // Added specialization here as well
        type: [String],
        enum: [
            'Casual Wear',
            'Formal Wear',
            'Business Casual',
            'Streetwear',
            'Athleisure (sportswear)',
            'Evening & Cocktail Attire',
            'Wedding & Bridal',
            'Vacation & Resort Wear',
            'Plus-Size Fashion',
            'Other'
        ]
    },
    designerInfo: { type: Schema.Types.ObjectId, ref: 'DesignerInfo' } // Reference to DesignerInfo
});

module.exports = mongoose.model('DesignerProfile', DesignerProfileSchema);
