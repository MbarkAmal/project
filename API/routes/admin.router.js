const express = require('express');
const route = express.Router();




const user = require('../controllers/admin')

const formidable = require('express-formidable');




route.post('/logindash',user.logindash);

route.get('/adminPhoto/:id' ,user.userPhoto );

route.put('/updatedetail/:id', formidable(), user.updateUser);


//route.post('/createPhoto', formidable() , user.createphoto)



module.exports = route ;