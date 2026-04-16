const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        require : [true, 'firstName is require']
    },
    lastName : String,

    email : {
        type : String,
        require : [true, 'lastName is require'],
        unique : true
    },
    password : {
        type : String,
        require : [true, 'password is require']
    },
    userType : {
        type : String,
        enum : ['user', 'host'],
        default : 'user'
    }
});


module.exports = mongoose.model('User', userSchema);