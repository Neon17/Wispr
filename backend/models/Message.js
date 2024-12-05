const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Sender ID is required'],
        ref: 'User'
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Group is required to send and receive message'],
        ref: 'Group'
    },
    message: {
        type: String,
        required: [true, 'Something should be written to send']
    },
    dateTime: {
        type: Date,
        required: [true, 'Date Time is required'],
        default: Date.now()
    }
    // we can make attachments, emoji later
},
    {toJSON: { virtuals: true }},
    {toObject: { virtuals: true }}
)

messageSchema.virtual('isUser').get(function(id) {
    if (id==undefined) return false;
    return (this.senderId._id.toString==id.toString);
});

const Message = mongoose.model('Message',messageSchema);

module.exports = Message;
