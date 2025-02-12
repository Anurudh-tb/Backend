const e = require("express");

const loginError = async(req, res, next) =>{
   try {
    const {email, password} = req.body;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!email || !password){
        const error = new Error('Enter valid email and password');
        error.status=400;
        return next(error);
    }

    if(!emailPattern.test(email)){
        const error = new Error('Invalid email format');
        error.status=400;
        return next(error);
    }
    next();
   } catch (error) {
    next(error);
   }

}

module.exports=loginError