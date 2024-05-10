const user = require ('../models/User');

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