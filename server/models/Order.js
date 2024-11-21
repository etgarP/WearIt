const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getClientImage } = require('../services/Client/ClientInfoService')


// the order details
const OrderSchema = new Schema({
    numberOfOutfits: { type: Number, required: true },
    group: { type: String },
    clientImage: { type: String, required: true },
    designerImage: { type: String, required: true },
    isGroup: { type: Boolean, required: true },
    occasion: { type: String },
    preferences: { type: String },
    status: { type: String, enum: ['pending', 'rejected', 'accepted', 'finished'], required: true },
    designer: { type: String },
    username: { type: String }
});

OrderSchema.pre('save', function (next) {
    if (this.username) {
        this.clientImage = getClientImage(this.username);
    }
    next();
});

module.exports = mongoose.model('Order', OrderSchema);
