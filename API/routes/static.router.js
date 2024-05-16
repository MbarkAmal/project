const express = require('express');

const static = require('../controllers/static.controller')

const route = express.Router();

route.get ('/countconsumercreatedfortoday' ,static.countConsumerCreatedToday)

route.get('/orderforToday', static.countOrdersForToday)

route.get('/salesForToday', static.totalPriceToday)

route.get('/productsSelesForToday', static.countProductsdeliveredForToday)

route.get('/getLastCustomerorder', static.getLastFiveOrders)

route.get('/countOrderBySatuts'  , static.countOrdersByStatus)

route.get('/countOrderDeliveredForMonth' , static.countOrdersForMonth)

route.get('/totalPriceForWeekMonthYear' , static.totalPriceForWeekMonthYear)

route.get('/totalPriceInCategory' , static.totalPriceInCategoryForWeekMonthYear)


module.exports = route 