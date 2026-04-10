const path = require('path');
const fs = require('fs');
const rootDir = require('../utils/path_Utils');


const favfilePath = path.join(rootDir, 'data', 'favourite.json');


module.exports = class favourite {

    static addToFavourite(homeId, callback){
        favourite.getFavourites(Favourites => {
            if (Favourites.includes(homeId)){
                callback("O Pai Hai A Bus kar!");
            } else {
                Favourites.push(homeId);
                fs.writeFile(favfilePath, JSON.stringify(Favourites), callback);
            }
        });
    }



    static getFavourites(callback){
        fs.readFile(favfilePath, (err, data) => {
            if (err){
                console.error("ERROR !!!!!", err);
                return callback([]);
            }

            try {
                const favouriteListData = JSON.parse(data);
                callback(favouriteListData);
            } catch (e) {
                callback([]);
            }
        });
    }

    static removefavouriteById(favouriteId, callback){
        favourite.getFavourites(favourite => {
            favourite = favourite.filter(Fhomes => Fhomes !== favouriteId);
            fs.writeFile(favfilePath, JSON.stringify(favourite), callback);
        });
    }
}