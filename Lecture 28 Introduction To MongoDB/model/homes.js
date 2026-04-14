// Import Database
const { ObjectId } = require('mongodb');
const { getdb } = require('../utils/databaseUtils');


module.exports = class houseList{
    constructor(houseName, price, location, rating, photoUrl, description, _id){
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
        this.description = description;
        if (_id){
            this._id = _id;
        }
    }


    save(){
       const db = getdb();
       
        // Pass Whole Object For Update.    
        const updateFields = {
            houseName: this.houseName,
            price: this.price,
            location: this.location,
            rating: this.rating,
            photoUrl: this.photoUrl,
            description : this.description
        }

        if (this._id){       // Update Homes
            return db.collection('homes').updateOne({_id : new ObjectId(String(this._id))}, {$set : updateFields});

       } else {             // Add New Homes
           return db.collection('homes').insertOne(this);
       }
    }
    
    static fetchAll(){
        const db = getdb();
        return db.collection('homes').find().toArray();
    }

    static findById(homeId){
        console.log(homeId);
        const db = getdb();
        return db.collection('homes').find({_id : new ObjectId(String(homeId))}).next();
    }
    
    
    static deleteById(homeId){
        const db = getdb();
        return db.collection('homes').deleteOne({_id : new ObjectId(String(homeId))});
    }
}