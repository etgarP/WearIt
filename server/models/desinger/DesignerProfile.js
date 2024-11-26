const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    designerUsername: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    number: { type: Number, min: 1, max: 5, required: true },
    review: { type: String, required: true },
    userPicture: { type: String, required: true }
});

const DesignerProfileSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    bio: { type: String, maxlength: 250 },
    reviews: [ReviewSchema],
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

module.exports = {
    DesignerProfile: mongoose.model('DesignerProfile', DesignerProfileSchema),
    Review: mongoose.model('Review', ReviewSchema)
};