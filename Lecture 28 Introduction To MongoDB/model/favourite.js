const { ObjectId } = require('mongodb');
const { getdb } = require('../utils/databaseUtils');

module.exports = class favourite{
    
    constructor(houseId){
        this.houseId = houseId;
    }
    
    save(){
        const db = getdb();
        return db.collection('favourite').findOne({houseId : this.houseId})
        .then(existFav => {
            if (!existFav){
                return db.collection('favourite').insertOne(this);
            }
            return Promise.resolve();
        });
    }
    
    
    static fetchAll(){
        const db = getdb();
        return db.collection('favourite').find().toArray();
    }

    static removefavouriteById(houseId){
        const db = getdb();
        return db.collection('favourite').deleteOne({houseId : houseId});
    }
}