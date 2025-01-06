const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    'name': {
        type: String,
    },
    'members': [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'At least two member required to form group'],
        ref: 'User'
    }],
    'groupPicture': {
        type: String
    },
    'accept_status': {
        type: String,
        default: "1" //if non friend user hasn't accepted message request, then their ids are stored here
    },
    'createdAt': {
        type: String,
        required: true,
        default: Date.now()
    },
    'onlineStatus': {
        type: Boolean,
        default: false
    }
})

const Group = mongoose.model('Group',groupSchema);

module.exports =  Group;
