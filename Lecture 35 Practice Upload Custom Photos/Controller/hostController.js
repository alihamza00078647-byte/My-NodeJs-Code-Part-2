const sampleDB = require("../model/homes");


exports.getaddhomes = (req, res, next) => {
    res.render('host/edit-home', { pageTitle : 'Add home', 
        editing : false,
        isLoggedIn : req.isLoggedIn,
        user : req.session.myUser
    });
}


exports.postaddhomes = (req, res, next) => {
    const {houseName, price, location, rating, description} = req.body;
    const photo = req.file.path;

    const homes = new sampleDB({houseName, price, location, rating, description, photo});
    

    if (!req.file){
        return res.status(400).redirect('/host/addhomes');
    }

    homes.save().then(() => {
        console.log("Home Save Successfully");
    }).catch(() => {
        console.log('Error While Saving homes');
    });
    return res.redirect('/host/addhomes');
}



exports.gethosthomepage = (req, res, next) => {
    sampleDB.find().then(registeredHomes => {
            res.render('host/hosthomepage', { pageTitle : 'host home Page',
            registeredHomes : registeredHomes,
            isLoggedIn : req.isLoggedIn,
            user : req.session.myUser
        });
    });
}


exports.getdeleteItems = (req, res, next) => {
    const homeId = req.params.homeId;

    sampleDB.findByIdAndDelete(homeId).then(() => {
        console.log('Delete Home Succuessfully');
        return res.redirect('/host/hosthomepage');
    }).catch((err) => {
        console.log('Error During Deletion', err);
        return res.redirect('/host/hosthomepage');
    });
}



exports.getEditHome = (req, res, next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';
    sampleDB.findById(homeId).then(homes => {
            res.render('host/edit-home', {pageTitle : "Edit Your Home",
            editing : editing,
            Home : homes,
            isLoggedIn : req.isLoggedIn,
            user : req.session.myUser
        });    
    });
}



exports.postEditHome = (req, res, next) => {
    const {_id, houseName, price, location, rating, description} = req.body;


    sampleDB.findById(_id).then(home => {
        home.houseName = houseName;
        home.price = price;
        home.location = location;
        home.rating = rating;
        // home.photo = photo;
        home.description = description;

        if (req.file){
            home.photo = req.file.path;
        }


        home.save().then(result => {
            console.log("Update Home Successfully", result);
            return res.redirect('/host/hosthomepage');
        }).catch(err => {
            console.log("Update Error", err);
            return res.redirect('/host/hosthomepage');
        });
    });
}