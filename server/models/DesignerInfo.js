const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 
const DesignerInfoSchema = new Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    allergies: { type: String },
    work: { type: String },
    city: { type: String },
    religion: { type: String },
    other: { type: String },
    age: { type: Number, required: true },
    image: { type: String }
});

module.exports = mongoose.model('DesignerInfo', DesignerInfoSchema);
