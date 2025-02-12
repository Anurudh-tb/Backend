const express=require('express')
const userRoute=express.Router();
const{signUp,login} =require('../Controller/userController.js')
const loginError=require('../Middlewares/loginerrorhandlerMiddleware.js')

userRoute.post('/',signUp);
userRoute.post('/login',loginError ,login)

module.exports=userRoute