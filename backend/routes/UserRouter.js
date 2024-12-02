const express = require('express');
const userRouter = express.Router();
const userController = require('./../controllers/UserController');

userRouter.post('/login',userController.login);
userRouter.post('/signup',userController.signup);

module.exports = userRouter;
