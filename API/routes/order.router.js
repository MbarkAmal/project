const express = require('express');
const order = require('../controllers/order.controller')
const router = express.Router();

router.post('/orders/:userId', order.createOrder);

router.get('/fetchorder', order.getAllllOrder);

router.delete('/deleteOrder/:id', order.delete);

router.get('/getorderById/:id', order.getOrderDetailByID)

router.put('/updateStatusOrder/:id', order.updateStatusOrder)
module.exports = router;
