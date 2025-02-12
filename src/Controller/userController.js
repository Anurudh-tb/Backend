const jwt=require("jsonwebtoken")
const user=require('../Db/Models/user')
const bcrypt=require('bcrypt')
const {generateToken}=require('../Middlewares/authMiddlewares.js')

const signUp = async (req, res, next) => {
  try {
    const body = req.body;
    
    //Insert the data into the database
    const newUser = await user.create({
    email: body.email,
    password: body.password,
    confirmPassword: body.confirmPassword
  });

  if (!newUser) {
    return next(new Error("Failed to create user", 400));
  }

  //convert the json data to javascript object
  const result = newUser.toJSON(); 

  delete result.password;

  if(!result){
    const error = new Error('Failed to create a new user');
    error.status = 400;
    return next(error);
  }

  // Send successful response after removing the inserted password
  return res.status(201).json({
    status: "success",
    data: result,
  });
  } 
  catch (error) {
    // Handle unexpected errors
    next(error);
  }
};

const login=async(req,res,next)=>{
    try {

        // Extract the email and password from the request body
        const { email, password } = req.body;
    
        // Find user in the database
        const result = await user.findOne({ where: { email } });
    
        // Check if user exists and password matches
        if (!result || !(await bcrypt.compare(password, result.password))) {
          const error = new Error('Incorrect email or password');
          error.status = 401;
          return next(error);
        }
    
        // Generate token
        const token = generateToken({
          id: result.id,
          email: result.email
        });
    
        // Send successful response
        return res.json({
          status: "success",
          token,
        });
      } catch (error) {
        // Handle unexpected errors
       next(error);
      }

};


module.exports={
    signUp,login
}