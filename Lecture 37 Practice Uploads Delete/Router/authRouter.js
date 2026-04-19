// External Module
const express = require('express');
const authRouter = express.Router();

// Local Module
const authController = require('../Controller/authController');


authRouter.get('/login', authController.getLoginPage);

authRouter.post('/login', authController.postLoginPage);

authRouter.post('/logout', authController.postLogoutPage);

authRouter.get('/signup', authController.getSignupPage);

authRouter.post('/signup', authController.postSignupPage);



exports.authRouter = authRouter;