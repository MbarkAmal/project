const express = require('express');

const static = require('../controllers/static.controller')

const route = express.Router();

route.get ('/countconsumercreatedfortoday' ,static.countConsumerCreatedToday)

route.get('/orderforToday', static.countOrdersForToday)

module.exports = route 