
const Order = require('../models/Order');
const Panier = require('../models/Panier');
const User = require('../models/User');

// POST /orders
// Create an order for a specific user by user ID
exports.createOrder = async (req, res) => {
    const userId = req.params.userId; // Assuming userId is passed as a route parameter

    try {
        // Fetch user detail from user model using userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch username separately
        const username = user.username;
        console.log(username);

        // Fetch Paniers associated with the userId and populate the products array
        const paniers = await Panier.find({ 'userID._id': userId }).populate('products._id');
        if (paniers.length === 0) {
            return res.status(404).json({ error: 'Paniers not found for the user' });
        }

        // Prepare paniers with product names
        const paniersWithProductNames = paniers.map(panier => {
            const productDetails = panier.products.map(product => ({
                _id: product._id,
                productName: product.productName,
                price: product.price
            }));
            return {
                _id: panier._id,
                products: productDetails,
                totalPrice: panier.total,
                quantity: panier.quantity // Include quantity from panier
            };
        });

        // Create a new order
        const order = new Order({
            user: {
                _id: userId,
                username: username
            },
            paniers: paniersWithProductNames,
            totalPrice: paniers.reduce((acc, panier) => acc + panier.total, 0)
        });

        // Save the order to the database
        const savedOrder = await order.save();

        // Send the response including product names and prices
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};






