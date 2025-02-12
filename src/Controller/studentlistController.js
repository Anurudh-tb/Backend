
const Student = require("../Db/Models/student");


// Add a new student
const addStudent = async (req, res, next) => {
  try {
    const {  firstname, middlename, lastname, dob, address, email, gender,age } = req.body;

    // Validate that all required fields are provided
    if ( !firstname || !middlename || !lastname) {
      return res.status(400).json({
        error: "Name, first name, middle name, and last name are required fields.",
      });
    }

    // Create the student
    const newStudent = await Student.create({
      firstname,
      middlename,
      lastname,
      dob,
      address,
      email,
      gender,
      age,
      UpdatedAt: new Date()
    });

    return res.status(201).json({
      message: "Student added successfully",
      student: newStudent, // Return the new student details
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getStudentList = async (req, res, next) => {
    try {
      const students = await Student.findAll(); 
  
      console.log("Student Data: ", students);
  
      return res.status(200).json({
        status: 'success',
        data: students
      });
    } catch (error) {
      next(error);
    }
  };
  

module.exports = {
  addStudent,getStudentList
};
