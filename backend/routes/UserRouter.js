const express = require('express');
const userRouter = express.Router();

const protect = require('./../middleware/protect');
const authController = require('../controllers/AuthController');
const userController = require('../controllers/UserController');

userRouter.post('/login',authController.login);
userRouter.post('/signup',authController.signup);

userRouter.route('/')
    .get(protect,userController.getAllUsers)

module.exports = userRouter;
