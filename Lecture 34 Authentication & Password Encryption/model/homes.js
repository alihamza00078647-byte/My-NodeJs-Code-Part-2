// Import Mongoose
const mongoose = require('mongoose');
const favourite = require('./favourite');


const homeSchema = mongoose.Schema({
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

homeSchema.pre('findOneAndDelete', async function(next){
    const homeId = this.getQuery()._id;
    await favourite.deleteMany({houseId : homeId});
    // next();
});


module.exports = mongoose.model('Home', homeSchema);
