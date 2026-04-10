const { render } = require("ejs");
const houseList = require("../model/home");
const favourite = require("../model/favourite");


exports.getIndex = (req, res, next) => {
    houseList.fetchAll(registeredHomes => {
        res.render('store/index', {pageTitle : 'index', registeredHomes : registeredHomes});
    });
}


exports.bookingList = (req, res, next) => {
    res.render('store/booking', {pageTitle : 'booking Homes'});
}



// user Home page Imports
exports.getHomePage = (req, res, next) => {
    houseList.fetchAll(registeredHomes => {
        res.render('store/userhomePage', {pageTitle : 'home page', registeredHomes : registeredHomes});
    });
}


// Get details of Each home
exports.gethomedetails = (req, res, next) => { 
    // Assign data To variables
    const homeId = req.params.homeId;
    // Home is CallBack function
    houseList.findById(homeId, home => {
        if (!home){
            console.log("Oye Kity Chala A Tu!");
            res.redirect("/home");
        } else {
            // Pass the Home Object to Page.
            res.render('store/show-each-home', {pageTitle : 'Home page', home : home}); 
        }
    });
}

exports.favouriteList = (req, res, next) => {
    favourite.getFavourites(favourite => {
        houseList.fetchAll(registeredHomes => {
            const getHomesfromFile = registeredHomes.filter(home => favourite.includes(home.id));
            res.render('store/favourite-list', {pageTitle : 'favourite Home List', registeredHomes : getHomesfromFile});
        });
    })
}


exports.postfavouriteList = (req, res, next) => {
    
    favourite.addToFavourite(req.body.id, error => {
        if (error){
            console.log("Registered Homes Error :", error);
        }
        res.redirect('/favourite');
    });
    // res.render('store/favourite-list', {pageTitle : 'favourites', home : home});
}


