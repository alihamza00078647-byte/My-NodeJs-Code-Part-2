const mongoose = require('mongoose');
const sampleFavourite = require('./favourite');



const sampleSchema = mongoose.Schema({
    houseName : {
        type : String,
        require : true
    },
    price : {
        type : Number,
        require : true
    },
    location : {
        type : String,
        require : true
    },
    rating : {
        type : Number,
        require : true
    },
    photoUrl : String,
    description : String

});

sampleSchema.pre('findOneAndDelete', async function(next){
    const homeId = this.getQuery()._id;
    await sampleFavourite.deleteMany({houseId : homeId});
});



module.exports = mongoose.model('sampleDB', sampleSchema);