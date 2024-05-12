const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        _id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'users', 
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },

    paniers: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'panier',
            required: true
        },
        products: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            productName: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
            // Add other fields as needed
        }],
        quantity:{
            type:Number
        },
        totalPrice: {
            type: Number,
            required: true
        }
        // Add other fields as needed
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'delivered', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('order', orderSchema);
