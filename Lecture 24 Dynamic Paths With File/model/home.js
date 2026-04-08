// Database
// let registeredHomes = [];


const path = require('path');
const fs = require('fs');
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

    save(){
        this.id = Math.random().toString();
        houseList.fetchAll((registeredHomes) => {
            registeredHomes.push(this);
            fs.writeFile(filePath, JSON.stringify(registeredHomes), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback){
        fs.readFile(filePath, (err, data) => {
            // callback(!err ? JSON.parse(data): []);
            if (!err) {
                callback(JSON.parse(data));
            } else {
                console.log(err);
            }
        });
    }

    
    static findById(homeId, callback){
        this.fetchAll(homes => {
        let homeFound = homes.find(eachHome => eachHome.id == homeId)
            callback(homeFound);
        });
    }
}