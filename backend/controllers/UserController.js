const Group = require("../models/Group");
const User = require("../models/User");
const Message = require('../models/Message');
const asyncErrorHandler = require("../utils/asyncErrorHandler");


exports.getAllUsers = asyncErrorHandler(async(req,res,next)=>{
    let users = await User.find({_id: {$ne:{_id: req.user._id}}});
    res.status(200).json({
        status: 'success',
        data: users
    })
})

exports.uploadProfilePicture = asyncErrorHandler(async(req,res,next)=>{

})

exports.profile = asyncErrorHandler(async(req,res,next)=>{
    res.status(200).json({
        status: 'success',
        data: req.user
    })
})

exports.showAllGroupList = asyncErrorHandler(async(req,res,next)=>{

    let allGroups = await Group.find({})
        .populate({
            path: 'members'
        }).exec();
    
    let groups=[];
    allGroups.forEach((group)=>{
        for (i=0;i<group.members.length;i++){
            if (group.members[i]._id.toString()==req.user._id.toString()) {
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

exports.showSearchUsername = asyncErrorHandler(async(req,res,next)=>{
    // here we have to search for direct message or group message
    // in direct message, username should be considered, if group message, name should be like username1,username2+6 others
    // let username = req.body.username;
    let allGroups = await Group.find({})
        .populate({
            path: 'members',
        }).exec();
    let groups=[];
    let status = 0, groupCount = 0;
    let groupName = "";
    let nameCount = 0;
    allGroups.forEach((group)=>{
        if (group.members.length==2) status = 1;
        groupName = "";
        for (i=0;i<group.members.length;i++){
            if (group.members[i]._id.toString()==req.user._id.toString()) {
                groups.push(group);
                if (status == 1) {
                    if (group.members[(i==1)?0:1].middleName!=null)
                        groupName = group.members[(i==1)?0:1].firstName + " "+ group.members[(i==1)?0:1].middleName + " "+ group.members[(i==1)?0:1].lastName;
                    else groupName = group.members[(i==1)?0:1].firstName + " "+ group.members[(i==1)?0:1].lastName;
                }
                groupCount= groupCount+1;
                break;
            }
        }
        nameCount = 0;
        if ((status != 1)&&(group.name==null)){
            for (i=0;i<3;i++){
                if (group.members[i]._id!=req.user._id) {
                    if (nameCount!=0) groupName = groupName + ", ";
                    groupName = groupName + group.members[i].firstName;
                    nameCount = nameCount+1;
                }
                if (nameCount==2){
                    groupName = groupName + `+${group.members.length-2}`;
                    break;
                }
            }
        }
        if (groupCount>0) groups[groupCount-1].name = groupName;
        status = 0;
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

exports.addMemberInGroup = asyncErrorHandler(async(req,res,next)=>{
    if (!req.body.id) throw new Error("At least one group should be selected");
    if (!req.body.members) throw new Error("At least one member is needed to form a group");
    let group = await Group.findById(req.body.id);
    if (group.length==0) throw new Error("Group with that ID doesn't exists");
    let memberArray = [];
    for (i=0;i<group.members.length;i++){
        memberArray.push(group.members[i]);
    }
    let addStatus = 0;
    if (typeof(req.body.members)=='object'){
        for (i=0;i<req.body.members.length;i++){
            if (req.body.members[i].toString()==req.user._id.toString()) addStatus = 1;
            let u = await User.findById(req.body.members[i]);
            if (u.length==0) addStatus = 1;
            for (j=0;j<memberArray.length;j++){
                if (memberArray[j]==req.body.members[i]){
                    addStatus = 1;
                    break;
                }
            }
            if (addStatus==0) memberArray.push(req.body.members[i]);
        }
    }
    else if (typeof(req.body.members)=='string'){
        let u = await User.findById(req.body.members);
        if (u.length==0) throw new Error("Member with that ID doesn't exists");
        let addStatus = 0;
        for (j=0;j<memberArray.length;j++){
            if (memberArray[j]==req.body.members){
                addStatus = 1;
                break;
            }
        }
        if (addStatus==1) throw new Error("Member with that ID is already in the group");
        else memberArray.push(req.body.members);
    }
    let updatedGroup = await Group.findByIdAndUpdate(req.body.id,{members: memberArray},{new:true, runValidators: true})
        .populate('members').exec();
    res.status(200).json({
        status: 'success',
        data: updatedGroup
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
