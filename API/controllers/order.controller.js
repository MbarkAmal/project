
const Order = require('../models/Order');
const Panier = require('../models/Panier');
const User = require('../models/User');

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
        const email = user.email;
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
                price: product.price,
                category : product.category,
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
                username: username,
                email : email,
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

// fetch all order

exports.getAllllOrder = async(req , res) => {
    Order.find()
    .then(orders => {
        res.status(200).json(orders)
    })
    .catch(error => {
        console.error("error fetching orders" , error);
        res.status(400).json({ message : "server error"})
    })

};


//delete order 

exports.delete = async (req , res) =>{
    try {
        const id = req.params.id;
        await Order.findByIdAndDelete({_id: id}) ;
        res.status(200).json({message : " order deleted seccessfully" } )

    }catch (error) {
        console.log("error deleting order" , error)
        res.status(500).json({message: "server error"})
    }
};

//get order by id
exports.getOrderDetailByID = async (req , res) => {
    try {
      const result = await Order.findById({_id: req.params.id});
      res.status(200).json({ result}) ;
  
    }catch(err) {
      console.error("error fetchin order by id", err);
      res.status(500).json({message :"server error"})
    }
  }
  
  //updata satutus order 
  exports.updateStatusOrder = async (req , res) => {
    try {
      const status = req.body;
      const updateData = status ;
      
      const update = await Order.findByIdAndUpdate(req.params.id, updateData, {new: true});
  
      if(!update) {
        return res.status(404).json({success: false, message: "order not found"})
      }
  
      res.status(200).json({success: true, message: "status updated successufully",order: update })
    }catch (error) {
      console.error("Error while updating product:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
  }
  }
  
  //get order by use id
  exports.getOrderDetailByUserID = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await Order.find({ 'user._id': userId });
        res.status(200).json({ result });
    } catch (err) {
        console.error("Error fetching order by user ID", err);
        res.status(500).json({ message: "Server error" });
    }
};