// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const hostController = require('../Controller/hostController');


hostRouter.get('/addhomes', hostController.getaddhomes);

hostRouter.post('/addhomes', hostController.postaddhomes);

hostRouter.get('/edit-homes/:homeId', hostController.getEditHome);

hostRouter.post('/edit-homes', hostController.postEditHome);

hostRouter.get('/hosthomepage', hostController.gethosthomepage);

hostRouter.get('/delete/:homeId', hostController.getdeleteItems);



exports.hostRouter = hostRouter;