const rootDir = require('../utils/pathUtils');
const fs = require('fs');
const { register } = require('module');
const path = require('path');
const filePath = path.join(rootDir, 'data', 'homesData.json');



module.exports = class houseList{
    constructor(houseName, price, location, rating, photoUrl, description){
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
        this.description = description;
    }


    save(){

        houseList.fetchAll(registeredHomes => {     // Edit Home Case
        if (this.id){
            registeredHomes = registeredHomes.map(home => {
                if (home.id === this.id){
                    return this;
                }
                return home;
            });

        } else {       // Add Home Case
                this.id = Math.random().toString();
                registeredHomes.push(this);
            }
            fs.writeFile(filePath, JSON.stringify(registeredHomes), err => {
                console.log(err);
            });
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

    static findById(homeId, callback){
        houseList.fetchAll(registeredHomes => {
            let foundHome = registeredHomes.find(home =>  home.id === homeId);
            callback(foundHome);
        });
    }

    static deleteById(homeId){
        houseList.fetchAll(registeredHomes => {
            registeredHomes = registeredHomes.filter(home => home.id !== homeId);
            fs.writeFile(filePath, JSON.stringify(registeredHomes), err => {
                console.log(err);
            });
        });
    }
}