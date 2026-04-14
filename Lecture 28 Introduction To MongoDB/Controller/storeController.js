const favourite = require("../model/favourite");
const houseList = require("../model/homes");



exports.getIndexpage = (req, res, next) => {
    houseList.fetchAll().then(registeredHomes => {
        res.render('store/index', { pageTitle: 'airbnb', registeredHomes: registeredHomes });
    });
}

exports.getHomepage = (req, res, next) => {
    houseList.fetchAll().then(registeredHomes => {
        res.render('store/home', { pageTitle: 'home page', registeredHomes: registeredHomes });
    });
}


exports.getfavouries = (req, res, next) => {

    favourite.fetchAll().then(favouritedata => {

        // Will Only Returns the houseId.
        favouritedata = favouritedata.map(fav => fav.houseId);
        houseList.fetchAll().then(registeredHomes => {
            // Will Convert into String then check favourite homes.
            registeredHomes = registeredHomes.filter(home => favouritedata.includes(home._id.toString()));

            res.render('store/favourite', { pageTitle: 'Edit homes', favouritehomes: registeredHomes });
        });
    });
}


// exports.getfavouries = (req, res, next) => {
//     favourite.favouritefindById(favouritehomeList => {
//         // console.log(favouritehomeList);
//         res.render('store/favourite', {pageTitle : 'Edit homes', favouritehomes : favouritehomeList});
//     });
// }


exports.getbookings = (req, res, next) => {
    res.render('store/bookings', { pageTitle: 'bookings page' });
}


exports.gethomedetails = (req, res, next) => {
    const homeId = req.params.homeId;
    houseList.findById(homeId).then(home => {
        if (!home) {
            console.log("Error While Fetching Homes from Id");
        }
        res.render('store/home-details-page', { pageTitle: 'home-details', Home: home });
    });
}


exports.postfavourite = (req, res, next) => {
    let homeId = req.body.id;

    const fav = new favourite(homeId);
    fav.save().then(result => {
        console.log("favourites = ", result);
    }).catch(err => {
        console.log("Error While Add To Favourite", err);
    }).finally(() => {
        res.redirect('/favourite');
    });
}



exports.postremovefavourite = (req, res, next) => {
    const houseId = req.params.homeId;
    favourite.removefavouriteById(houseId).then(result => {
        // Will Display Error If Occur.
        console.log("Add favourite Successfully", result);
    }).catch(err => {
        console.log("Error While Writing favourites File", err);
    }).finally(() => {
        res.redirect('/favourite');
    });
};


