const express=require('express')
// const studentlistValidation=require('../Middlewares/studentlistMiddlewares')
const   {addStudent,getStudentList}=require('../Controller/studentlistController')

const studentListRouter=express.Router()

// studentListRouter.get('/',studentlistValidation)
studentListRouter.post('/add',addStudent)
studentListRouter.get('/list',getStudentList)

module.exports=studentListRouter