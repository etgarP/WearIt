const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// all the client info that the designer needs
const ClientInfoSchema = new Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    allergies: { type: String },
    work: { type: String },
    city: { type: String },
    religion: { type: String },
    other: { type: String },
    age: { type: Number, required: true },
    image: { type: String },
    measurements: {
        shoulder: { type: Number, required: true },
        bust: { type: Number, required: true },
        waist: { type: Number, required: true },
        hips: { type: Number, required: true },
        thighs: { type: Number, required: true },
        calves: { type: Number, required: true },
        legs: { type: Number, required: true }
    }
});

module.exports = mongoose.model('ClientInfo', ClientInfoSchema);
