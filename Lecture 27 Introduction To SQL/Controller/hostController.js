const houseList = require("../model/homes");



exports.getAddHomes = (req, res, next) => {
    res.render('host/edit-homes', {pageTitle : 'Edit homes', editing : false});
}


exports.postAddHomes = (req, res, next) => {
    
    const {houseName, price, location, rating, photoUrl, description} = req.body;
    const homes = new houseList(houseName, price, location, rating, photoUrl, description);
    homes.save();
    res.render('host/edit-homes', {pageTitle : 'Edit homes', editing : false});
}




exports.gethosthomepage = (req, res, next) => {
    houseList.fetchAll().then(([registeredHomes]) => {
        res.render('host/hosthomepage', {pageTitle : 'host-home-page', 
        registeredHomes : registeredHomes,
        });
    });
}


exports.getEditingHomes = (req, res, next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';

    houseList.findById(homeId).then(([home]) => {
        const homes = home[0];
        res.render('host/edit-homes', { pageTitle : "Edit Homes", home : homes, editing : editing});
    });
}



exports.postEditHomes = (req, res, next) => {

    const {id, houseName, price, location, rating, photoUrl, description} = req.body;
    const homes = new houseList(houseName, price, location, rating, photoUrl, description, id);
    homes.save();
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

