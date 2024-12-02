const User = require("../models/User");
const asyncErrorHandler = require("../utils/asyncErrorHandler");


exports.getAllUsers = asyncErrorHandler(async(req,res,next)=>{
    //It gets all users except self
    let users = await User.find({_id: {$ne:{_id: req.user._id}}});
    res.status(200).json({
        status: 'success',
        data: users
    })
})
