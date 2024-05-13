const express = require('express');
const order = require('../controllers/order.controller')
const router = express.Router();

router.post('/orders/:userId', order.createOrder);

router.get('/fetchorder', order.getAllllOrder);

router.delete('/deleteOrder/:id', order.delete);
module.exports = router;
