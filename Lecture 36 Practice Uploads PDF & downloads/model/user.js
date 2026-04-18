const sampleDB = require('./homes')
const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        require : [true, 'firstName is required']
    },
    lastName : {
        type : String,
        require : [true, 'lastName is required']
    },
    email : {
        type : String,
        require : [true, 'email is required']
    },

    password : {
        type : String,
        require : [true, 'password is required']
    },

    userType : {
        type : String,
        enum : ['user', 'host'],
        default : 'user'
    },

    favourites : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "sampleDB"
    }]
});


module.exports = mongoose.model('User', userSchema);