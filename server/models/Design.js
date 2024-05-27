const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the current state of the designers work on the order
const DesignSchema = new Schema({
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    urls: [{ type: String, required: true }]
});

module.exports = mongoose.model('Design', DesignSchema);
