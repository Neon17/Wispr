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
