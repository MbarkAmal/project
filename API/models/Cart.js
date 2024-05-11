const mongoose = require('mongoose')
const  cartSchema = new mongoose.Schema ({
  userID: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
  },
    username: {
        type: String,
    }
},


    Fullname: {
        type: String,
       // required : true,
    } ,
    phone : {
        type:Number ,
        required : true,
    },
    address : {
        type: String ,
       required : true,
    }, 
    city : {
        type : String, 
        required : true,
    },
    state : {
        type : String,
        required : true ,
    },
    zip : {
        type : Number ,
        required : true,
    },
    country : {
        type : String , 
        required : true,
    } , 

    CardNum : {
        type : Number ,
      // required : true ,

    },
    cvv : {
        type : Number ,
       required : true,
    },
    dateEX : {
      type: Date,
     //  required : true
    },

});

module.exports = mongoose.model('cart',cartSchema);