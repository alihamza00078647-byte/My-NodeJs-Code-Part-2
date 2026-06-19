const { default: mongoose } = require("mongoose");



const todoItemsSchema = mongoose.Schema({
    task : {
      type : String,
      required : true
    },
    date : Date,
},

    { timestamps : true }
);


module.exports = mongoose.model('TodoItems', todoItemsSchema);