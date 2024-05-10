const express = require ('express')
const route = express.Router()
const formidable = require('express-formidable');


const user = require('../controllers/user.controller')

route.get('/getAllUser', user.getAllUser);

route.delete('/deleteUser/:id', user.delete);

route.put('/updateUser/:id',  user.updateUser);

route.get('/getoneuser/:id',user.getoneuser)

module.exports = route 

