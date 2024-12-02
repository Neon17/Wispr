const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

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
    'email': {
        type: String,
        unique: [true, 'User with that email already exists'],
        required: [true, 'Email is required'],
        validate: [validator.isEmail, 'Proper Email should be given']
    },
    'password': {
        type: String,
        required: [true, 'Password is required']
    },
    'confirmPassword': {
        type: String,
        required: [true, 'Confirm Password is required'],
        validate: {
            validator: function(val){
                return this.password===val;
            },
            message: "Password and Confirm Password should match"
        }
    },
});

userSchema.pre('save',async function(next){
    if (!this.isModified('password')) return next();
    this.confirmPassword = undefined;
    this.password = await bcrypt.hash(this.password,12);
    next();
});

userSchema.methods.comparePassword = async (pswd, pswdDB)=>{
    return await bcrypt.compare(pswd,pswdDB);
}

const User = mongoose.model('User',userSchema);

module.exports = User;
