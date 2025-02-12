const Teacher=require("../Db/Models/teacher")
const { Op } = require('sequelize');

const addTeacher=async(req ,res ,next)=>{
    try{
        const { name, email, phone, govt_id, address, marital_status } = req.body;

        const existingTeacher = await Teacher.findOne({
            where: { 
              [Op.or]:[ {email}, {phone}, { govt_id }]
            }
          });
      
          if (existingTeacher) {
            return res.status(400).json({
                 message: "Teacher with this email, phone, or govt_id already exists."
                 });
          }
        const newTeacher=await Teacher.create({
            name,
            email,
            phone,
            govt_id,
            address,
            marital_status
        });

        return res.status(201).json({
            message:"Teacher is added successfully",
            data:newTeacher
        })
    }catch(error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
      }
};

const getTeacherslist = async(req,res,next)=>{
    try{
        const teachers = await Teacher.findAll({
            attributes: ['id', 'name', 'email', 'phone', 'govt_id', 'address', 'marital_status', 'createdAt']
          });
      
          return res.status(200).json({
            message: "Teachers retrieved successfully",
            data: teachers
          });
    }catch(error){
        next(error)
    }
}

module.exports={
    addTeacher,getTeacherslist
}