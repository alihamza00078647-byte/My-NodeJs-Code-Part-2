// External Module
const express = require('express');
const authRouter = express.Router();

// Local 
const authController = require('../Controller/authController');



authRouter.get('/login', authController.getLoginPage);

authRouter.post('/login', authController.postLoginPage);

authRouter.post('/logout', authController.postLogoutPage);

authRouter.get('/signup', authController.getSignUpPage);

authRouter.post('/signup', authController.postSignUpPage);



exports.authRouter = authRouter;