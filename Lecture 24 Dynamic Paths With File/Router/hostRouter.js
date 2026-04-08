// External Module
const express = require('express');


// local Mudule
const hostRouter = express.Router();
const hostController = require('../controllers/host');


hostRouter.get('/add-home', hostController.getAddhome);


hostRouter.post('/add-home', hostController.postaddhomes);

hostRouter.get('/hosthomepage', hostController.gethostHomePage);


exports.hostRouter = hostRouter;