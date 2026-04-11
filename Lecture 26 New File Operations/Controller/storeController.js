const favourite = require("../model/favourite");
const houseList = require("../model/homes");



exports.getIndexpage = (req, res, next) => {
    houseList.fetchAll(registeredHomes => {
        res.render('store/index', {pageTitle : 'airbnb', registeredHomes : registeredHomes});
    });
}

exports.getHomepage = (req, res, next) => {
    houseList.fetchAll(registeredHomes => {
    res.render('store/home', {pageTitle : 'home page', registeredHomes : registeredHomes});
    });
}


exports.getfavouries = (req, res, next) => {
    favourite.favouritefindById(favouritehomeList => {
        // console.log(favouritehomeList);
        res.render('store/favourite', {pageTitle : 'Edit homes', favouritehomes : favouritehomeList});
    });
}


exports.getbookings = (req, res, next) => {
    res.render('store/bookings', {pageTitle : 'bookings page'});
}


exports.gethomedetails = (req, res, next) => {
    const homeId = req.params.homeId;
    houseList.findById(homeId, home => {
        res.render('store/home-details-page', {pageTitle : 'home-details', Home : home});
    });
}


exports.postfavourite = (req, res, next) => {
    favourite.saveFavourites(req.body.id, favouritehome => {
        // Will Display Error If Occur.
        console.log("Error While Add favourites : ", favouritehome);
        res.redirect('/favourite');
    });
}

exports.postremovefavourite = (req, res, next) => {
    const homeId = req.params.homeId;
    favourite.removefavouriteById(homeId, err => { 

        // Will Display Error If Occur.
        console.log("Error While Writing favourites File", err);
        res.redirect('/favourite');
    });
};


