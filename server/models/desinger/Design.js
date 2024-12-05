const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for each design entry
const DesignEntrySchema = new Schema({
    url: { type: String, required: true },
    imageOfCloth: { type: String },
    imageOfWornCloth: { type: String },
    typeOfCloth: {
        type: String,
        required: true,
        enum: ['shirt', 'other'] // Enum restricts the values to 'shirt' or 'other'
    }
});

// The main schema for the design
const DesignSchema = new Schema({
    beforeImage: { type: String, required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true, unique: true, index: true },
    items: [DesignEntrySchema] // Array of subdocuments for detailed design entries
});

const Design = mongoose.model('Design', DesignSchema);

module.exports = Design;
