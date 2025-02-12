const express=require('express')
const cors = require('cors');
const bodyParser=require('body-parser')

const app=express()
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
const connection=require('./src/Config/connection')

const PORT=process.env.APP_PORT || 4000

const userRoute=require("./src/routes/userRoutes");//Router for user related operations
const studentListRouter=require("./src/routes/studentList");//Router for student related operations
const teacherListRouter=require('./src/routes/teacherlist');//Router for teacher related operations 
const groupRouter=require('./src/routes/courseList');


app.use("/api/database/users",userRoute);//Endpoint for user related operations
app.use("/api/database/studentlist",studentListRouter);//Endpoint for student related operations
app.use("/api/database/teacherlist",teacherListRouter);//Endpoint for teacher related operations
app.use("/api/database/courseList",groupRouter)
app.listen(PORT,()=>{
    console.log(`The server is running on ${PORT}`);
})

