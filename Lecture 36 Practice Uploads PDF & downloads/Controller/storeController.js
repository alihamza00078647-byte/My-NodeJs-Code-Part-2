// Core
const path = require('path');

// Local
const rootDir = require('../utils/pathUtils');
const sampleDB = require("../model/homes");
const User = require('../model/user');




exports.getIndexpage = (req, res, next) => {
    sampleDB.find().then(registeredHomes => {
        res.render('store/index', { pageTitle : 'Index page',
        registeredHomes : registeredHomes,
        isLoggedIn : req.isLoggedIn,
        user : req.session.myUser
        });
    });
}


exports.getHomepage = (req, res, next) => {
    sampleDB.find().then(registeredHomes => {
            res.render('store/home', {pageTitle : 'home page', 
            registeredHomes : registeredHomes,
            isLoggedIn : req.isLoggedIn,
            user : req.session.myUser
        });
    });
}

exports.getbookingpage = (req, res, next) => {
    res.render('store/bookings', {pageTitle : 'bookings page', 
        isLoggedIn : req.isLoggedIn, 
        user : req.session.myUser
    });
}


exports.eachHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    sampleDB.findById(homeId).then(home => {
        res.render('store/home-details', {pageTitle : 'Home Details page', 
            Home : home,
            isLoggedIn : req.isLoggedIn,
            user : req.session.myUser
        });
    });
}


exports.getfavourite = async (req, res, next) => {

    const userId = req.session.myUser.id;
    const user = await User.findById(userId).populate('favourites');
    res.render('store/favourite', { pageTitle : 'favourites page', 
        registeredHomes : user.favourites,
        isLoggedIn : req.isLoggedIn,
        user : req.session.myUser
    });
}





exports.getOnefavourite = async (req, res, next) => {

    const homeId = req.params.homeId;
    const userId = req.session.myUser.id;
    const user = await User.findById(userId);         // Async Operation
    
    if (!user.favourites.includes(homeId)){
        user.favourites.push(homeId);
        await user.save();
    }

    return res.redirect('/favourite');
}



exports.postRemovefavourite = async (req, res, next) => {
    
    const favId = req.params.favId;

    const userId = req.session.myUser.id;
    const user = await User.findById(userId);
    if (user.favourites.includes(favId)){
        user.favourites = user.favourites.filter(fav => fav != favId);
        await user.save();
    }
    
    res.redirect('/favourite');
}


exports.postHouseRules = [(req, res, next) => {
    if (!req.session.isLoggedIn){
        return res.redirect('/login');
    }
    next();
},

    (req, res, next) => {
        const homeId = req.params.homeId;
        const pdfFileName = `house rules-{homeId}.pdf`;
        const filePath = path.join(rootDir, 'rules', pdfFileName);

        res.download(filePath, 'Rules.pdf');
    }

]