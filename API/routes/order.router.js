const express = require('express');
const order = require('../controllers/order.controller')
const router = express.Router();

router.post('/orders/:userId', order.createOrder);
module.exports = router;
