// External Module
const express = require('express');
const storeRouter = express.Router();

// Local
const storeController = require('../Controller/storeController');


storeRouter.get('/', storeController.getIndexpage);

storeRouter.get('/home', storeController.getHomepage);

storeRouter.get('/bookings', storeController.getbookingpage);

storeRouter.get('/home/details/:homeId', storeController.eachHomeDetails);

storeRouter.get('/favourite', storeController.getfavourite);

storeRouter.post('/favourite/remove/:favId', storeController.postRemovefavourite);

storeRouter.get('/favourite/:homeId', storeController.getOnefavourite);





exports.storeRouter = storeRouter;