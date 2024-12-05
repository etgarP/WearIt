const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The order details
const OrderSchema = new Schema({
    numberOfOutfits: { type: Number, required: true },
    group: { type: String },
    clientImage: { type: String, required: true },
    designerImage: { type: String },
    isGroup: { type: Boolean, required: true },
    occasion: { type: String },
    preferences: { type: String },
    status: { type: String, enum: ['Pending', 'Rejected', 'Accepted', 'Finished'], required: true },
    designer: { type: String },
    username: { type: String }
});


module.exports = mongoose.model('Order', OrderSchema);
