const user = require ('../models/User');

const order = require('../models/Order')
//count custumer compte for today 
exports.countConsumerCreatedToday = async (req , res) => {
    try{
      const today = new Date ();
      const startOfDay = new Date (today.getFullYear(), today.getMonth(), today.getDate());
      const endOfDay = new Date (today.getFullYear() , today.getMonth(), today.getDate() +1);
  
      const consumerCount = await user.aggregate([
        {
            $match : {
                createdAt : {
                    $gte : startOfDay,
                    $lt: endOfDay
                }
            }
        },
        {
            $group : {
                _id : null ,
                count : {$sum : 1}
            }
        }
  
  
      ]);
      res.status(200).json(consumerCount);
    } catch (err) {
        console.error ('error counting consumer created for totday' , err);
        res.status(500).json({message : 'server error '}) ;
    }
  }

  //count orders delivred for Today
  exports.countOrdersForToday = async (req, res) => {
    try {
      // Get the current date
      const today = new Date();
      
      // Get the start and end of today
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  
      const orderCount = await order.aggregate([
        {
          $match: {
              status: 'delivered' ,
              createdAt: {
              $gte: startOfDay,
              $lt: endOfDay
              }
            }
          
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 }
          }
        }
      ]);
  
      if (orderCount.length === 0) {
        return res.status(200).json({ count: 0, message: 'No orders for today' });
      }
  
      res.status(200).json(orderCount[0]); 
    } catch (error) {
      console.error('Error counting orders for today:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// salas for today $
exports.totalPriceToday = async (req, res) => {
    try {
      const today = new Date () ;
      const startOfDay = new Date (today.getFullYear() , today.getMonth(), today.getDate());
      const endOfDay = new Date (today.getFullYear() , today.getMonth(), today.getDate() +1);
  
      const totalPrice = await order.aggregate([
        {
          $match: {
            status: 'delivered' ,
            createdAt: {
              $gte: startOfDay,
              $lt: endOfDay
            }
          }
        },
      
        {
          $group: {
            _id: null,
            total: { $sum: '$totalPrice' }
          }
        }
      ]);
  
      res.status(200).json(totalPrice);
    } catch (error) {
      console.error('Error counting total price for all months:', error);
      res.status(500).json({ message: ' server error' });
    }
  };

  // count products delivred for today
  exports.countProductsdeliveredForToday = async (req, res) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        const productsCount = await order.aggregate([
            {
                $match: {
                    status: 'delivered',
                    createdAt: {
                        $gte: startOfDay,
                        $lt: endOfDay
                    }
                }
            },
            {
                $unwind: '$paniers'
            },
            {
                $unwind: '$paniers.products'
            },
            {
                $group: {
                    _id: null,
                    totalProducts: { $sum: '$paniers.quantity' }
                }
            }
        ]);

        res.status(200).json(productsCount);
    } catch (err) {
        console.error('Error counting products', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//get last 5 customer orderd For today
exports.getLastFiveOrders = async (req, res) => {
    try {
        const orders = await order.find()
            .sort({ createdAt: -1 }) // Sort orders by createdAt in descending order
            .limit(5); // Limit the result to the first 5 orders

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders", error);
        res.status(400).json({ message: "Server error" });
    }
};

  