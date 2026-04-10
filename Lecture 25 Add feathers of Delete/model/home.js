// Database



const path = require('path');
const fs = require('fs');
const favourite = require('./favourite');
const rootDir = require('../utils/path_Utils');
const filePath = path.join(rootDir, 'data', 'homesdata.json');



module.exports = class houseList{
    constructor(houseName, price, location, rating, photoUrl){
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
    }
    // Read All homes if not exist then save it
    save(){
        houseList.fetchAll((registeredHomes) => {
            if (this.id){       // Edit home case
                registeredHomes = registeredHomes.map(home => {
                    if (home.id === this.id){
                        return this;
                    }
                    return home;
                });
            } else {    // Register home Case
                this.id = Math.random().toString();
                registeredHomes.push(this);
            }
            fs.writeFile(filePath, JSON.stringify(registeredHomes), (err) => {
                console.log(err);
            });
        });
    }

    // Read File and give all homes list
    static fetchAll(callback){
        fs.readFile(filePath, (err, data) => {
            // callback(!err ? JSON.parse(data): []);
            if (err) {
                return callback([]);
            }
            try{
                callback(JSON.parse(data));
            } catch (e){
                return callback([]);
            }
        });
    }

    // search home based on Id & give callback
    static findById(homeId, callback){
        houseList.fetchAll(homes => {
        let homeFound = homes.find(eachHome => eachHome.id == homeId)
            callback(homeFound);
        });
    }

    static deleteHomes(homeId, callback){
        houseList.fetchAll(homes => {
            homes = homes.filter(home => home.id !== homeId);
            fs.writeFile(filePath, JSON.stringify(homes), err => {
                if (err) return callback(err);
                favourite.removefavouriteById(homeId, callback);
            });
        });
    }
}