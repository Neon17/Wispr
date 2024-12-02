const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    'id': {
        type: mongoose.Types.ObjectId
    },
    'name': {
        type: String,
    },
    'members': [{
        type: String,
        required: [true, 'At least two member required to form group']
    }],
    'createdAt': {
        type: String,
        required: true,
        default: Date.now()
    }
})

const Group = mongoose.model('Group',groupSchema);

module.exports =  Group;
