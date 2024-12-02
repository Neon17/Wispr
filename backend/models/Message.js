const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Group is required to send and receive message']
    },
    text: {
        type: String,
        required: [true, 'Something should be written to send']
    },
    dateTime: {
        type: Date,
        required: [true, 'Date Time is required'],
        default: new Date.now().toISOString()
    }
    // we can make attachments, emoji later
})

const Message = mongoose.model('Messages',messageSchema);

module.exports = Message;
