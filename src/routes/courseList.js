const express=require('express')
const {createCourse,addStudentsToGroup} = require('../Controller/groupController');
const getAllGroups=require('../Controller/grouplistController');
const {getCourses}=require('../Controller/groupController')
const groupRouter=express.Router();

groupRouter.post('/groups',createCourse);
groupRouter.post("/groups/:groupId/add-students", addStudentsToGroup);
groupRouter.get('/getCourseDetails/:id',getAllGroups);
groupRouter.get('/getcourses',getCourses);
module.exports=groupRouter