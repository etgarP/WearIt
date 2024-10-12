const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// all the client info that the designer needs
const ClientInfoSchema = new Schema({
    username: { type: String, required: true, unique: true },
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
        shoulder: { type: Number },
        bust: { type: Number },
        waist: { type: Number },
        hips: { type: Number },
        thighs: { type: Number },
        calves: { type: Number },
        legs: { type: Number }
    }
});

module.exports = mongoose.model('ClientInfo', ClientInfoSchema);
