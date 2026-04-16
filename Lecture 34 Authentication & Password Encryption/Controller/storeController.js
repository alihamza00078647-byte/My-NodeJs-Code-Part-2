const favourite = require('../model/favourite');
const Home = require("../model/homes");



exports.getIndexpage = (req, res, next) => {
    Home.find().then(registeredHomes => {
        res.render('store/index', { pageTitle: 'airbnb', registeredHomes: registeredHomes,
        isLoggedIn : req.isLoggedIn
        });
    });
}

exports.getHomepage = (req, res, next) => {
    Home.find().then(registeredHomes => {
        res.render('store/home', { pageTitle: 'home page', registeredHomes: registeredHomes,
        isLoggedIn : req.isLoggedIn
        });
    });
}



exports.getfavouries = (req, res, next) => {

    favourite.find()
    // Will Evaluate Based On reference
    .populate('houseId')
    .then(favouritedata => {
        // Will Only Returns the houseId.
            favouritedata = favouritedata.map(fav =>  fav.houseId);
            res.render('store/favourite', { pageTitle: 'Edit homes', favouritehomes : favouritedata,
            isLoggedIn : req.isLoggedIn
        });

    }).catch(err => {
        console.log("Error While fetching favourites", err);
    });
}




exports.getbookings = (req, res, next) => {
    res.render('store/bookings', { pageTitle: 'bookings page', isLoggedIn : req.isLoggedIn });
}


exports.gethomedetails = (req, res, next) => {
    const homeId = req.params.homeId;
    Home.findById(homeId).then(home => {
        if (!home) {
            console.log("Error While Fetching Homes from Id");
        }
        res.render('store/home-details-page', { pageTitle: 'home-details', Home: home,
        isLoggedIn : req.isLoggedIn 
        });
    });
}


exports.postfavourite = (req, res, next) => {
    let homeId = req.body.id;
    favourite.findOne({ houseId : homeId})
    .then(existsFav => {
        if (existsFav){
            return res.redirect('/favourite');

        } else {
            const fav = new favourite({houseId : homeId})
            fav.save().then((res) => {
                console.log("Favourite Added", res);
            });
        }
    });
    res.redirect('/favourite');
}



exports.postremovefavourite = (req, res, next) => {
    const houseId = req.params.homeId;

    favourite.findOneAndDelete({houseId : houseId})
    .then((result) => {
        // Will Display Error If Occur.
        console.log("Delete favourite Successfully", result);
    }).catch((err) => {
        console.log("Error While Writing favourites File", err);
    }).finally(() => {
        res.redirect('/favourite');
    });
};


