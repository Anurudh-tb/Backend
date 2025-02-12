//Import the jwt token library
const jwt = require("jsonwebtoken");
require('dotenv').config();

//function to generate a jwt token after getting the payload data
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Export the function to make it accessible in other modules
module.exports ={
    generateToken
}

