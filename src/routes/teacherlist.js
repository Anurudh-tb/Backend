const express=require('express')
const {addTeacher,getTeacherslist} =require('../Controller/teacherlistController')

const teacherListRouter=express.Router()

teacherListRouter.post('/addteacher',addTeacher)
teacherListRouter.get('/list',getTeacherslist)

module.exports=teacherListRouter