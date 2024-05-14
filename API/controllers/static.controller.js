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
