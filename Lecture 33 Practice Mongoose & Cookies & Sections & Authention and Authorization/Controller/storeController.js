const sampleFavourite = require("../model/favourite");
const sampleDB = require("../model/homes");



exports.getIndexpage = (req, res, next) => {
    sampleDB.find().then(registeredHomes => {
        res.render('store/index', { pageTitle : 'Index page',
        registeredHomes : registeredHomes,
        isLoggedIn : req.isLoggedIn
        });
    });
}


exports.getHomepage = (req, res, next) => {
    sampleDB.find().then(registeredHomes => {
        res.render('store/home', {pageTitle : 'home page', 
        registeredHomes : registeredHomes,
        isLoggedIn : req.isLoggedIn
        });
    });
}

exports.getbookingpage = (req, res, next) => {
    res.render('store/bookings', {pageTitle : 'bookings page', isLoggedIn : req.isLoggedIn});
}


exports.eachHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    sampleDB.findById(homeId).then(home => {
        res.render('store/home-details', {pageTitle : 'Home Details page', 
            Home : home,
            isLoggedIn : req.isLoggedIn
        });
    });
}


exports.getfavourite = (req, res, next) => {
    sampleFavourite.find().then(favouriteHome => {
        favouriteHome = favouriteHome.map(fav => fav.houseId.toString());
        sampleDB.find().then(registeredHomes => {
            registeredHomes = registeredHomes.filter(home => favouriteHome.includes(home._id.toString()));
            res.render('store/favourite', { pageTitle : 'favourites page', 
                registeredHomes : registeredHomes,
                isLoggedIn : req.isLoggedIn
            });
        });
    });
}





exports.getOnefavourite = (req, res, next) => {
    const homeId = req.params.homeId;
    sampleFavourite.findOne({houseId : homeId}).then(homeExist => {
        
        if (homeExist){
            console.log("Already Exists!");
            return res.redirect('/favourite');
            
        } else {
            const fav = new sampleFavourite({houseId : homeId});
            fav.save().then(() => {

                console.log("Favourite Save Sucuessfully");
                return res.redirect('/favourite');
                
            }).catch((err) => {
                console.log("Error While Saving favourite", err);
            });
        }
    });
}



exports.postRemovefavourite = (req, res, next) => {
    const favId = req.params.favId;
    sampleFavourite.findOneAndDelete({houseId : favId}).then(() => {
        console.log("delete favourite Successfully");
        return res.redirect('/favourite');
    }).catch((err) => {
        console.log("Error delete While favourite ", err);
    });
}


