const { render } = require("ejs");
const houseList = require("../model/home");


exports.gethostHomePage = (req, res, next) => {
    houseList.fetchAll(registeredHomes => {
        res.render('store/hosthomePage', {pageTitle : 'home page', registeredHomes : registeredHomes});
    });
}


exports.getAddhome = (req, res, next) => {
    res.render('host/homedetails', {pageTitle : 'Add New Home'});
}

exports.postaddhomes = (req, res, next) => {
    const {houseName, price, location, rating, photoUrl} = req.body;
    const homes = new houseList(houseName, price, location, rating, photoUrl);
    homes.save();
    res.render('host/success', {pageTitle : 'Successfully Added'});
}



exports.gethostHomePage = (req, res, next) => {
    houseList.fetchAll(registeredHomes => {
        res.render('host/hosthomePage', {pageTitle : 'host Home page', registeredHomes : registeredHomes});
    });
}
