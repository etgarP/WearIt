const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DesignerInfoSchema = new Schema({
    username: { type: String, required: true, unique: true }, 
    name: { type: String, required: true },
    gender: { type: String, required: true },
    city: { type: String, required: true },
    religion: { type: String },
    age: { type: Number, required: true },
    specialization: {
        type: [String], // Allows multiple expertise selections
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
});

module.exports = mongoose.model('DesignerInfo', DesignerInfoSchema);
