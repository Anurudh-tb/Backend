require('dotenv').config({path:`${process.cwd()}/.env`})

const { query } = require('express');
const mysql=require('mysql2')
const connection=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

  // connection.connect((err)=>{
  //   if(err){
  //       console.error('database connection success',err.message)
  //   }else{
  //       console.log('database connection successful');
        
  //   }
  // });
  
  



