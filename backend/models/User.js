const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    'firstName': {
        type: String,
        required: [true, 'First Name is required']
    },
    'middleName': {
        type: String
    },
    'lastName' : {
        type: String,
        required: [true, 'Last Name is required']
    },
    'username': {
        type: String,
        required: [true, 'username is required for login']
    },
    'password': {
        type: String,
        required: [true, 'password is required']
    },
    'confirmPassword': {
        type: String,
        required: [true, 'confirm Password is required'],
        validate: {
            validator: function(val){
                return this.password===val;
            }
        }
    },
})

const User = mongoose.model('User','userSchema');

export default User;
