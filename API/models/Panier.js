const mongoose = require ('mongoose');

const panierSchema = new mongoose.Schema({

    userID: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        username: {
            type: String,
        }
    },

    products: [{
        _id: {type : mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
    productName : {
        type: String , required: true ,
     },
     price: { type: Number, required: true },
     
     photo: {
        data: Buffer,
        contentType: String,
    },
     }],

    quantity: {
        type: Number,
        default: 1,
      },

    total: {
        type: Number,
    }

},
{ timestamps: true },
);

module.exports = mongoose.model('panier', panierSchema);
