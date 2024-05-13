const Cart = require('../models/Cart'); // Assuming your cart model is in '../models/cart'
const Panier = require('../models/Panier'); // Assuming your panier model is in '../models/panier'

exports.remplircartForm = async (req, res) => {
    try {
        // Extract data from request body
        const { user, Fullname, phone, address, city, state, zip, country, CardNum, cvv, dateEx } = req.body;

        // Create a new cart object
        const cart = new Cart({
            userID: {
                _id: user._id,
                username: user.username
            },
            Fullname: Fullname,
            phone: phone,
            address: address,
            city: city,
            state: state,
            zip: zip,
            country: country,
            CardNum: CardNum,
            cvv: cvv,
            dateEX: dateEx
        });

        const savedCart = await cart.save();

        res.status(201).json(savedCart);
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({ error: 'Could not create cart', message: error.message });
    }
};