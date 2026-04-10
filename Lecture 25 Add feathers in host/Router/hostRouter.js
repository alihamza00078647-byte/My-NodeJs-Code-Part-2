// External Module
const express = require('express');


// local Mudule
const hostRouter = express.Router();
const hostController = require('../controllers/host');


hostRouter.get('/add-home', hostController.getAddhome);

hostRouter.post('/host/add-home', hostController.postaddhomes);

hostRouter.get('/hosthomepage', hostController.gethostHomePage);

hostRouter.get("/host/edit-home/:homeId", hostController.getEdithome);

hostRouter.post("/host/edit-home", hostController.postEdithome);


exports.hostRouter = hostRouter;