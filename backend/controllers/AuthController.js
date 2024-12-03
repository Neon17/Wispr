const jwt = require('jsonwebtoken');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const User = require('../models/User');

const signToken = id=>{
    return jwt.sign({id: id}, process.env.SECRET_STR,{
        expiresIn: process.env.LOGIN_EXPIRES
    })
}

exports.login= asyncErrorHandler(async(req,res)=>{
    if (!req.body) throw new Error('Email and Password required');
    if (!req.body.email || !req.body.password) throw new Error('Email and Password required');
    let user = await User.findOne({email: req.body.email});
    if (!user) throw new Error('Invalid Email');
    if (!await user.comparePassword(req.body.password, user.password))
        throw new Error('Invalid Password');
    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token,
        data: user
    })
})

exports.signup = asyncErrorHandler(async(req,res)=>{
    if (!req.body) throw new Error('Fill every fields given');
    let user = await User.create(req.body);
    if (!user) throw new Error('Signup Failed');
    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token,
        data: user
    })
})
