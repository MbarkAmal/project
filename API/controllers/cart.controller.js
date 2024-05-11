const Cart = require('../models/Cart');

exports.remplircartForm = async (req, res) => {
    try {
        // Extract form data from request body
        const {
            Fullname,
            phone,
            address,
            city,
            state,
            zip,
            country,
            CardNum,
            CVV,
            dateEX
        } = req.body;

        // Create a new cart document
        const newCart = new Cart({
            Fullname,
            phone,
            address,
            city,
            state,
            zip,
            country,
            CardNum,
            CVV,
            dateEX
        });

        // Save the cart document to the database
        await newCart.save();

        // Send success response
        res.status(201).json({ message: 'Cart details added successfully' });
    } catch (error) {
        // Handle error
        console.error('Error adding cart details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
