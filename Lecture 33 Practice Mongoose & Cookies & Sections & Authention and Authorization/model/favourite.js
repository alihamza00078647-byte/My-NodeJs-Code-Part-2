// save(), fetchAll(), deleteById(); 

const { default: mongoose } = require("mongoose");


const favouriteSchema = mongoose.Schema({
    houseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "sampleDB",
        require : true,
        unique : true
    }
});



module.exports = mongoose.model('sampleFavourite', favouriteSchema);