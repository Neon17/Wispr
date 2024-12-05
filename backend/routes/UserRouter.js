const express = require('express');
const userRouter = express.Router();

const protect = require('./../middleware/protect');
const authController = require('../controllers/AuthController');
const userController = require('../controllers/UserController');

userRouter.post('/login',authController.login);
userRouter.post('/signup',authController.signup);

userRouter.get('/',protect,userController.getAllUsers)
userRouter.get('/showAllGroupList',protect,userController.showAllGroupList);
userRouter.get('/showSearchUsername',protect,userController.showSearchUsername);
userRouter.post('/addGroup',protect,userController.createGroup);
userRouter.post('/getAllMessages',protect,userController.getAllMessages);
userRouter.post('/sendMessage',protect,userController.sendMessage);
userRouter.post('/addMemberInGroup',protect,userController.addMemberInGroup);
userRouter.get('/fetchAllUnknownUsers',protect,userController.fetchAllUnknownUsers);

userRouter.post('/uploadProfilePicture',protect,userController.uploadProfilePicture);
userRouter.get('/profile',protect,userController.profile);

module.exports = userRouter;
