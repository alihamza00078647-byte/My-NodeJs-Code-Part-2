const houseList = require("../model/homes");



exports.getAddHomes = (req, res, next) => {
    res.render('host/edit-homes', {pageTitle : 'Edit homes', editing : false});
}


exports.postAddHomes = (req, res, next) => {
    
    const {houseName, price, location, rating, photoUrl, description} = req.body;
    const homes = new houseList(houseName, price, location, rating, photoUrl, description);
    homes.save().then(() => {
        console.log('Home Added Succuessfully');
    });
    res.render('host/edit-homes', {pageTitle : 'Edit homes', editing : false});
}




exports.gethosthomepage = (req, res, next) => {
    houseList.fetchAll().then(registeredHomes => {
        res.render('host/hosthomepage', {pageTitle : 'host-home-page', 
        registeredHomes : registeredHomes,
        });
    }).catch((err) => {
        console.log("Error Whie Reading All Data", err);
    });
}


exports.getEditingHomes = (req, res, next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';

    houseList.findById(homeId).then(home => {
        res.render('host/edit-homes', { pageTitle : "Edit Homes", home : home, editing : editing});
    });
}



exports.postEditHomes = (req, res, next) => {

    const {id, houseName, price, location, rating, photoUrl, description} = req.body;
    const homes = new houseList(houseName, price, location, rating, photoUrl, description, id);
    homes.save().then((result) => {
        console.log(result);
    });
    res.redirect('/hosthomepage');
}




exports.postRemoveHome = (req, res, next) => {
    const homeId = req.params.homeId;
    houseList.deleteById(homeId).then(() => {
        res.redirect('/hosthomepage');
    }).catch((err) => {
        console.log("Catch Error From Delete Homes", err);
    });
}

