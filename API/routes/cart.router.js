const express = require('express');
const cart = require('../controllers/cart.controller')
const route = express.Router();

route.post('/remplircartform', cart.remplircartForm)
module.exports = route;