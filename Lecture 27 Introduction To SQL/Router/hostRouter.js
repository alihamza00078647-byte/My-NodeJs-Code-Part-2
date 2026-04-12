// External Module
const express = require('express');
const hostRouter = express.Router();

// Local 
const hostController = require('../Controller/hostController');



hostRouter.get('/addhomes', hostController.getAddHomes);

hostRouter.post('/addhomes', hostController.postAddHomes);

hostRouter.get('/hosthomepage', hostController.gethosthomepage);

hostRouter.get('/host/edit/:homeId', hostController.getEditingHomes);


hostRouter.post('/edit-homes', hostController.postEditHomes);

hostRouter.post('/host/remove/:homeId', hostController.postRemoveHome)



exports.hostRouter = hostRouter;