const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// review of a costumer
const ReviewSchema = new Schema({
    designerUsername: { type: String, required: true },
    number: { type: Number, min: 1, max: 5, required: true },
    review: { type: String, required: true }
});

module.exports = mongoose.model('Review', ReviewSchema);
