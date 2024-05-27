const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Message = new Schema({
    id: { type: Number },
    created: { type: Date, default: Date.now },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, nullable: true }
});

const Chat = new Schema({
    id: { type: Number },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});

const Counter = new Schema({
    id: { type: Number },
    messageCount: { type: Number }
})

module.exports = {
    Chat: mongoose.model('Chat', Chat),
    Message: mongoose.model('Message', Message),
    Counter: mongoose.model('Counter', Counter)
};
