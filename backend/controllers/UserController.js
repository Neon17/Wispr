const Group = require("../models/Group");
const User = require("../models/User");
const Message = require('../models/Message');
const asyncErrorHandler = require("../utils/asyncErrorHandler");


const readUnreadMessage = async (messages, id)=>{
    // It sets ru status for logged in user based on messages
    // id is id of user
    let ruStatus = [], tempStatus = false;
    let userCountInMembers = -1;
    let group;

    for (let i = 0; i<messages.length;i++){
        if (messages[i]==undefined){
            ruStatus.push(null);
            continue;
        }
        group = await Group.findById(messages[i].groupId);
        for (let j=0;j<group.members.length;j++){
            if (group.members[j].toString()==id) {
                userCountInMembers = j; break;
            }
        }
        tempStatus = messages[i].readStatus[userCountInMembers]
        if ((messages[i].senderId.toString()!=id.toString())&&(!tempStatus))
            ruStatus.push(false);
        else 
            ruStatus.push(true);
    }

    return ruStatus;
}

const getJoinedGroups = asyncErrorHandler(async (req, res, next) => {
    let allGroups = await Group.find({})
        .populate({
            path: 'members'
        }).exec();

    let groups = [];
    let groupIds = [];
    allGroups.forEach((group) => {
        for (i = 0; i < group.members.length; i++) {
            if (group.members[i]._id.toString() == req.user._id.toString()) {
                groupIds.push(group._id);
                groups.push(group);
                break;
            }
        }
    })

    //for setting delivery status
    for (let j = 0; j < groupIds.length; j++) {
        let latestMessage = await Message.findOne({groupId: groupIds[j]}).sort('-dateTime').exec();
        if ((latestMessage!=null)&&(latestMessage.senderId.toString()!=req.user._id.toString())){
            await Group.findByIdAndUpdate(groupIds[j], { onlineStatus: true });
            let m = await Message.updateMany(
                {groupId: groupIds[j]},
                {$set: {deliveryStatus: true}},
                {new: true}
            );
        }
    }
    return groups;
})

const getLatestMessages = (async (groups) => {
    let messages = [];
    let message;
    for (let i = 0; i < groups.length; i++) {
        message = await Message.find({ groupId: groups[i]._id }).exec();
        messages.push(message[message.length - 1]);
    }
    return messages;
})

const nameJoinedGroups = (groups, id) => {
    //groups are parameter after populating members
    let status = 0, groupCount = 0;
    let groupName = "";
    let nameCount = 0;
    let temp;
    for (i = 0; i < groups.length; i++) {
        if (groups[i].members.length == 2) status = 1;
        nameCount = 0;
        groupName = "";
        if (status == 1) {
            temp = (groups[i].members[0]._id.toString() == id.toString()) ? 1 : 0;
            if (groups[i].members[temp].middleName != null)
                groupName = groups[i].members[temp].firstName + " " + groups[i].members[temp].middleName + " " + groups[i].members[temp].lastName;
            else groupName = groups[i].members[temp].firstName + " " + groups[i].members[temp].lastName;
            groupCount = groupCount + 1;
        }
        else if ((status == 0) && (groups[i].name == null)) {
            for (j = 0; j < 3; j++) {
                if (groups[i].members[j]._id != id) {
                    if (nameCount != 0) groupName = groupName + ", ";
                    groupName = groupName + groups[i].members[j].firstName;
                    nameCount = nameCount + 1;
                }
                if (nameCount == 2) {
                    groupName = groupName + `+${groups[i].members.length - 2}`;
                    break;
                }
            }
        }
        if (groups[i].name == null) groups[i].name = groupName;
        status = 0;
    }
    return groups;
}

exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
    let users = await User.find({ _id: { $ne: { _id: req.user._id } } });
    res.status(200).json({
        status: 'success',
        data: users
    })
})

exports.uploadProfilePicture = asyncErrorHandler(async (req, res, next) => {
    if (!req.body) throw new Error('Request body should be in valid JSON format');
    if (req.files) {
        let filePath = `/upload/images/${req.file.fileName}`;
        res.render("image", {
            filePath
        })
    }
    //save fileName in db
    let updatedUser = await User.findByIdAndUpdate(req.user._id, {
        profilePicture: req.fileName
    }, { new: true, runValidators: false });

    res.status(200).json({
        status: 'success',
        data: updatedUser
    })
})

exports.profile = asyncErrorHandler(async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: req.user
    })
})

exports.showAllGroupList = asyncErrorHandler(async (req, res, next) => {
    //It shows group list and latest message of each group
    let groups = await getJoinedGroups(req, res, next);
    groups = nameJoinedGroups(groups, req.user._id);
    let latestMessages = await getLatestMessages(groups);
    let ruStatus = await readUnreadMessage(latestMessages,req.user._id);
    res.status(200).json({
        status: 'success',
        data: {
            groups: groups,
            latestMessages: latestMessages,
            ruStatus
        }
    })
})

exports.fetchAllUnknownUsers = asyncErrorHandler(async (req, res, next) => {
    // It fetches all users but not group that user has started chatting with
    let groups = await getJoinedGroups(req, res, next);
    let allUsers = await User.find({ _id: { $not: { $eq: req.user._id } } });
    let users = [];
    allUsers.forEach((user) => {
        let st = 0;
        for (i = 0; i < groups.length; i++) {
            if (groups[i].members.length != 2) continue;
            if ((groups[i].members[0]._id.toString() == user._id.toString()) || ((groups[i].members[1]._id.toString() == user._id.toString()))) {
                st = 1; break;
            }
        }
        if (st == 0) users.push(user);
    })
    res.status(200).json({
        status: 'success',
        data: users
    })
})

exports.showSearchUsername = asyncErrorHandler(async (req, res, next) => {
    // here we have to search for direct message or group message
    // in direct message, username should be considered, if group message, name should be like username1,username2+6 others
    // let username = req.body.username;
    let groups = await getJoinedGroups(req, res, next);
    groups = nameJoinedGroups(groups, req.user._id);
    res.status(200).json({
        status: 'success',
        data: groups
    })
})

exports.createGroup = asyncErrorHandler(async (req, res, next) => {
    if (!req.body.id) throw new Error("At least one user is needed to form a group");

    if (typeof (req.body.id) == 'object') {
        let ids = [];
        ids.push(req.user._id);
        req.body.id.map((singleId) => {
            if (singleId != req.user._id)
                ids.push(singleId);
        })
        let prepareObj = {};
        if (req.body.name)
            prepareObj.name = req.body.name;
        prepareObj.members = ids;
        let group = await Group.create(prepareObj);
        return res.status(200).json({
            status: 'success',
            data: group
        })
    }
    else if (typeof (req.body.id) == 'string') {
        if (req.body.id == req.user._id) throw new Error("You can't create group with yourself");
        let user = await User.findById(req.user._id);
        if (user.length == 0) throw new Error("Selected User doesn't exists");
        let previousGroups = await Group.find({});
        let status = 0;

        //It is necessary to check previousGroup formed because every direct message is treated as group here
        previousGroups.map((previousGroup) => {
            status = 0;
            if (previousGroup.members.length == 2) {
                if ((previousGroup.members[0].toString == req.body.id) || (previousGroup.members[1].toString == req.body.id))
                    throw new Error('That group already exists');
            }
        })
        let group = await Group.create({
            members: [req.user._id, req.body.id]
        })
        return res.status(200).json({
            status: 'success',
            data: group
        })
    }
    res.status(200).json({
        status: 'error',
        message: 'request body should have id of type string or object(array)'
    })
})

exports.addMemberInGroup = asyncErrorHandler(async (req, res, next) => {
    if (!req.body.id) throw new Error("At least one group should be selected");
    if (!req.body.members) throw new Error("At least one member is needed to form a group");
    let group = await Group.findById(req.body.id);
    if (group.length == 0) throw new Error("Group with that ID doesn't exists");
    let memberArray = [];
    for (i = 0; i < group.members.length; i++) {
        memberArray.push(group.members[i]);
    }
    let addStatus = 0;
    if (typeof (req.body.members) == 'object') {
        for (i = 0; i < req.body.members.length; i++) {
            if (req.body.members[i].toString() == req.user._id.toString()) addStatus = 1;
            let u = await User.findById(req.body.members[i]);
            if (u.length == 0) addStatus = 1;
            for (j = 0; j < memberArray.length; j++) {
                if (memberArray[j] == req.body.members[i]) {
                    addStatus = 1;
                    break;
                }
            }
            if (addStatus == 0) memberArray.push(req.body.members[i]);
        }
    }
    else if (typeof (req.body.members) == 'string') {
        let u = await User.findById(req.body.members);
        if (u.length == 0) throw new Error("Member with that ID doesn't exists");
        let addStatus = 0;
        for (j = 0; j < memberArray.length; j++) {
            if (memberArray[j] == req.body.members) {
                addStatus = 1;
                break;
            }
        }
        if (addStatus == 1) throw new Error("Member with that ID is already in the group");
        else memberArray.push(req.body.members);
    }
    let updatedGroup = await Group.findByIdAndUpdate(req.body.id, { members: memberArray }, { new: true, runValidators: true })
        .populate('members').exec();
    res.status(200).json({
        status: 'success',
        data: updatedGroup
    })
})

exports.getAllMessages = asyncErrorHandler(async (req, res, next) => {
    //req.body contains groupId
    if (!req.body.groupId) throw new Error('Message can only be seen in the group');
    let groupMessages = await Message.find({ groupId: req.body.groupId })
        .populate('senderId').exec();
    let group = await Group.findById(req.body.groupId).exec();
    let readStatus = [];
    let messages = JSON.parse(JSON.stringify(groupMessages));
    let defaultReadStatus = [];

    let seenBy = [];
    let showChatHead = [];

    for (let i = 0; i < group.members.length; i++) {
        if (group.members[i].toString() == req.user._id.toString()) {
            defaultReadStatus.push(true);
        }
        else defaultReadStatus.push(false);
    }


    for (i = 0; i < messages.length; i++) {

        if (messages[i].senderId._id.toString() == req.user._id.toString())
            messages[i].isUser = true;
        else messages[i].isUser = false;

        if (messages[i].readStatus.length == 0) {
            await Message.findByIdAndUpdate(messages[i]._id, { readStatus: defaultReadStatus });
        }
        else {
            readStatus = [];
            for (j = 0; j < messages[i].readStatus.length; j++) {
                if (group.members[j].toString() == req.user._id.toString()) {
                    readStatus.push(true);
                }
                else readStatus.push(messages[i].readStatus[j]);
            }
            await Message.findByIdAndUpdate(messages[i]._id, { readStatus: readStatus });
        }
    }
    if (messages.length == 0) messages = null;

    //For Retrieving Seen
    let temp = 0, tempSeenBy = [];
    for (j = 0; j < messages.length; j++) {
        tempSeenBy = []; temp = 0;
        for (k = 0; k < messages[j].readStatus.length; k++) {
            if (messages[j].readStatus[k] && !(group.members[k].toString() == req.user._id.toString())) {
                temp = 1; break;
            }
        }
        if (temp == 0) tempSeenBy.push(messages[j].deliveryStatus);
        else {
            for (k = 0; k < messages[j].readStatus.length; k++) {
                tempSeenBy.push(messages[j].readStatus[k]);
            }
        }
        seenBy.push(tempSeenBy);
    }

    //For Making Ease in Frontend
    temp = 0; tempSeenBy = [];
    let status = 0;
    for (i = 0; i < (seenBy.length - 1); i++) {
        tempSeenBy = []
        status = 0;
        if ((seenBy[i].length > 1) && (seenBy[i+1].length > 1)) {
            for (j = 0; j < seenBy[i].length; j++) {
                if (j>=seenBy[i+1].length){
                    tempSeenBy.push(seenBy[i][j]);
                    continue;
                }
                if ((seenBy[i][j]) && (seenBy[i + 1][j]))
                    tempSeenBy.push(false);
                else tempSeenBy.push(seenBy[i][j]);
            }
        }
        else if (seenBy[i].length > 1){
            for (j = 0; j < seenBy[i].length; j++)
                tempSeenBy.push(seenBy[i][j]);
        }
        else status = 1;
        if (status == 1) showChatHead.push(seenBy[i]);
        else showChatHead.push(tempSeenBy);
    }
    showChatHead.push(seenBy[seenBy.length-1]);

    //to get all members of group
    let members = await Group.findById(req.body.groupId).populate('members');
    members = members.members;

    let allGroups = await Group.findById(req.body.groupId)
    .populate({
        path: 'members'
    }).exec();

    allGroups = nameJoinedGroups(allGroups, req.user._id);

    res.status(200).json({
        status: 'success',
        data: messages,
        group: allGroups,
        showChatHead: showChatHead
    })
})

exports.sendMessage = asyncErrorHandler(async (req, res, next) => {
    //req.body contains groupId, message
    if (!req.body.groupId || !req.body.message) throw new Error('Non-empty message can only be sent with the group');
    let group = await Group.findById(req.body.groupId).populate('members');
    if (group.length == 0) throw new Error('Group with that ID doesnt exist');
    let readStatus = [];
    for (let i = 0; i < group.members.length; i++) {
        if (group.members[i]._id.toString() != req.user._id.toString()) {
            readStatus.push(false);
        }
        else readStatus.push(true);
    }
    let message = await Message.create({
        groupId: req.body.groupId,
        message: req.body.message,
        senderId: req.user._id,
        readStatus: readStatus
    });
    //after sending new message, group onlineStatus (delivery) is set false
    await Group.findByIdAndUpdate(group._id,{ onlineStatus: false });
    res.status(200).json({
        status: 'success',
        data: message
    })
})
