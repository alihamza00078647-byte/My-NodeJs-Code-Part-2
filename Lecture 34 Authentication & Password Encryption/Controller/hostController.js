const Home = require("../model/homes");



exports.getAddHomes = (req, res, next) => {
    res.render('host/edit-homes', {pageTitle : 'Edit homes', editing : false,
        isLoggedIn : req.isLoggedIn
    });
}


exports.postAddHomes = (req, res, next) => {
    const {houseName, price, location, rating, photoUrl, description} = req.body;
    const homes = new Home({houseName, price, location, rating, photoUrl, description});
    homes.save().then(() => {
        console.log('Home Added Succuessfully');
    });
    res.render('host/edit-homes', {pageTitle : 'Edit homes', editing : false, isLoggedIn : req.isLoggedIn});
}




exports.gethosthomepage = (req, res, next) => {
    Home.find().then(registeredHomes => {
        res.render('host/hosthomepage', {pageTitle : 'host-home-page',
        registeredHomes : registeredHomes, isLoggedIn : req.isLoggedIn
        });
    }).catch((err) => {
        console.log("Error Whie Reading All Data", err);
    });
}


exports.getEditingHomes = (req, res, next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';

    Home.findById(homeId).then(home => {
            res.render('host/edit-homes', { pageTitle : "Edit Homes", home : home, 
            editing : editing,
            isLoggedIn : req.isLoggedIn
        });
    });
}



exports.postEditHomes = (req, res, next) => {

    const {id, houseName, price, location, rating, photoUrl, description} = req.body;
    Home.findById(id).then((home) => {
        home.houseName = houseName;
        home.price = price;
        home.location = location;
        home.rating = rating;
        home.photoUrl = photoUrl;
        home.description = description;
        home.save().then((result) => {
            console.log("UPdate Home Successfully", result);
            res.redirect('/host/hosthomepage');
        }).catch(err => {
            console.log('Error While Updating', err);

        }).catch(error => {
        console.log("Error While Finding home", error);
        });
    });
}




exports.postRemoveHome = (req, res, next) => {
    const homeId = req.params.homeId;
    Home.findByIdAndDelete(homeId).then(() => {
        res.redirect('/host/hosthomepage');
    }).catch((err) => {
        console.log("Catch Error From Delete Homes", err);
    });
}

