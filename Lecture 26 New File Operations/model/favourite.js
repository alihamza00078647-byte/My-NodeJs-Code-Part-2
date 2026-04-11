const rootDir = require('../utils/pathUtils');
const fs = require('fs');
const path = require('path');
const houseList = require('./homes');
const { register } = require('module');
const filePath = path.join(rootDir, 'data', 'favouriteData.json');



module.exports = class favourite{


    static saveFavourites(homeId, callback){
        favourite.fetchAll(favouriteId => {
            if (favouriteId.includes(homeId)){
                callback("Error While writing favourite files");
                // return;
            } else {
                favouriteId.push(homeId);
                fs.writeFile(filePath, JSON.stringify(favouriteId), callback);
            }
        }); 
    }


    static fetchAll(callback){
        fs.readFile(filePath, (err, data) => {
            if (err){
                console.log("Error While Reading File");
                callback([]);
            }
            try {
                callback(JSON.parse(data));
            } catch (e){
                callback([]);
            }
        });
    }


    static favouritefindById(callback){
        favourite.fetchAll(favouriteId => {
            houseList.fetchAll(registeredHomes => {
                let favouriteList = registeredHomes.filter(home => favouriteId.includes(home.id));
                callback(favouriteList);
            });
        });
    }


    static removefavouriteById(homeId, callback){
        favourite.fetchAll(favouriteId => {
            favouriteId = favouriteId.filter(Id => Id !== homeId)
            fs.writeFile(filePath, JSON.stringify(favouriteId), err => {
                callback(err);
            });
        });
    }
}