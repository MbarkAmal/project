const express = require('express');

const cart = require ('../controllers/panier.controller')

const route = express.Router();

route.post('/addtocart', cart.addtocart);

route.get('/getphoto/:productId',cart.getProductPhoto)

route.get('/getCartdetail/:cartId', cart.getCartDetail);

route.get('/getcart/:userId', cart.getCart)

module.exports = route 
