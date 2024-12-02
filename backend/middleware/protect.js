const jwt = require('jsonwebtoken');
const util = require('util');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const User = require('../models/User');

const protect = asyncErrorHandler(async (req,res,next)=>{
    const testToken = req.headers.authorization;
    let token;
    if (testToken==undefined) throw new Error("You are not logged in!");
    if (testToken.startsWith('Bearer')) token = testToken.split(' ')[1];
    if (token==undefined) throw new Error("You are not logged in!");
    const decodedToken = await util.promisify(jwt.verify)(token,process.env.SECRET_STR);
    const id = decodedToken.id;
    let user = await User.findById(id);
    if (!user) throw new Error("User with that ID can't be found!");
    req.user = user;
    next();
})

module.exports = protect;