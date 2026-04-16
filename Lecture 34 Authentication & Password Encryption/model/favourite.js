const mongoose = require('mongoose');

const favouriteSchema = mongoose.Schema({
    houseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Home",
        unique : true,
        require : true
    }
});


module.exports = mongoose.model('favourite', favouriteSchema);