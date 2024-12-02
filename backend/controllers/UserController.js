const Group = require("../models/Group");
const User = require("../models/User");
const Message = require('../models/Message');
const asyncErrorHandler = require("../utils/asyncErrorHandler");


exports.getAllUsers = asyncErrorHandler(async(req,res,next)=>{
    //It gets all users except self
    let users = await User.find({_id: {$ne:{_id: req.user._id}}});
    res.status(200).json({
        status: 'success',
        data: users
    })
})

exports.showAllGroupList = asyncErrorHandler(async(req,res,next)=>{
    let allGroups = await Group.find({});
    let groups=[];
    allGroups.forEach((group)=>{
        for (i=0;i<group.members.length;i++){
            if (group.members[i]==req.user._id) {
                groups.push(group);
                break;
            }
        }
    })
    res.status(200).json({
        status: 'success',
        data: groups
    })
})

exports.createGroup = asyncErrorHandler(async(req,res,next)=>{
    if (!req.body.id) throw new Error("At least one user is needed to form a group");
    if (req.body.id==req.user._id) throw new Error("You can't create group with yourself");
    let group = await Group.create({
        members: [req.user._id, req.body.id]
    })
    res.status(200).json({
        status: 'success',
        data: group
    })
})

exports.getAllMessages = asyncErrorHandler(async(req,res,next)=>{
    //req.body contains groupId
    if (!req.body.groupId) throw new Error('Message can only be seen in the group');
    let message = await Message.find({groupId: req.body.groupId}).sort({dateTime: -1});
    res.status(200).json({
        status: 'success',
        data: message
    })
})

exports.sendMessage = asyncErrorHandler(async (req,res,next)=>{
    //req.body contains groupId, message
    if (!req.body.groupId || !req.body.message) throw new Error('Non-empty message can only be sent with the group');
    let message = await Message.create(req.body);
    res.status(200).json({
        status: 'success',
        data: message
    })
})
