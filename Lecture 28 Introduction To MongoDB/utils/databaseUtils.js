const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const Mongo_URL = "" // Enter Your MongoDB Cloud URL Here

// UnderScore means private variable 
let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(Mongo_URL)
    .then((client) => {
        _db = client.db('airbnb');
        callback();
    }).catch((err) => {
        console.log(err);
    });
}


// Connect To DB
const getdb = () => {
    if (!_db){
        throw new Error("Database Not Connected");
    }
    return _db;
}



exports.mongoConnect = mongoConnect;
exports.getdb = getdb;