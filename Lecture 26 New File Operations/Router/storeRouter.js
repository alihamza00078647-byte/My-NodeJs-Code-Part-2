// External Module
const express = require('express');
const storeRouter = express.Router();

// Local 
const storeController = require('../Controller/storeController');


storeRouter.get('/', storeController.getIndexpage);

storeRouter.get('/home', storeController.getHomepage);

storeRouter.get('/bookings', storeController.getbookings);

storeRouter.get('/favourite', storeController.getfavouries);

storeRouter.post('/favourite', storeController.postfavourite);

// Variable for homeId
storeRouter.post('/removefavourite/:homeId', storeController.postremovefavourite);

storeRouter.get('/homedetials/:homeId', storeController.gethomedetails);


exports.storeRouter = storeRouter;