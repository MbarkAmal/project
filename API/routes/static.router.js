const express = require('express');

const static = require('../controllers/static.controller')

const route = express.Router();

route.get ('/countconsumercreatedfortoday' ,static.countConsumerCreatedToday)


module.exports = route 