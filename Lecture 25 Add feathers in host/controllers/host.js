const { render } = require("ejs");
const houseList = require("../model/home");


exports.gethostHomePage = (req, res, next) => {
    houseList.fetchAll(registeredHomes => {
        res.render('store/hosthomePage', {pageTitle : 'home page', registeredHomes : registeredHomes});
    });
}


exports.getAddhome = (req, res, next) => {
        res.render('host/edit-home', {
        pageTitle : 'Add New Home',
        editing : false,
    });
}

exports.postaddhomes = (req, res, next) => {
    const {houseName, price, location, rating, photoUrl} = req.body;
    const homes = new houseList(houseName, price, location, rating, photoUrl);
    homes.save();
    res.render('host/success', {pageTitle : 'Successfully Added'});
}



exports.gethostHomePage = (req, res, next) => {
    houseList.fetchAll(registeredHomes => {
        res.render('host/hosthomePage', {pageTitle : 'host Home page',
        registeredHomes : registeredHomes,
        });
    });
}



exports.getEdithome = (req, res, next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';
    houseList.findById(homeId, homeCallback => {
        if (!homeCallback){
            console.log('Home Data is Not found!');
            return res.redirect('/hosthomepage');
        }
        // console.log(homeCallback);
        res.render('host/edit-home', {
            pageTitle : 'Edit details',
            editing : editing,
            home : homeCallback,
        });
    });
}


exports.postEdithome = (req, res, next) => {
    const {id, houseName, price, location, rating, photoUrl} = req.body;
    const homes = new houseList(houseName, price, location, rating, photoUrl);
    homes.id = id;
    homes.save();
    res.redirect('/hosthomepage');
    // res.render('host/success', {pageTitle : 'Successfully Added'});
}