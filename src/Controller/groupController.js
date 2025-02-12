const course = require("../Db/Models/course");
const teacher=require("../Db/Models/teacher");
const courseMapping=require("../Db/Models/coursemapping");
const createCourse = async (req, res) => {
  try {
    const { courseName, teacherId } = req.body;

    // Validate input
    if (!courseName || !teacherId) {
      return res.status(400).json({ 
        success: false,
        message: 'courseName and teacherId are required' 
      });
    }

    // Check if teacher is already assigned to a group
    const existingGroup = await course.findOne({ 
      where: { teacherId: teacherId }
    });
    
    if (existingGroup) {
      return res.status(400).json({ 
        success: false,
        message: 'This teacher is already assigned to a group' 
      });
    }

    // Create new group
    const newGroup = await course.create({
      name: courseName,
      teacherId: teacherId
    });

    // Fetch course with teacher details
    const groupDetails = await course.findOne({
      where: { id: newGroup.id },
      attributes: ['id', 'name'], 
      include: [
        {
          model: teacher,  
          attributes: ['name'] 
        }
      ]
    });

    return res.status(201).json({
      success: true,
      data: {
        groupId: groupDetails.id,
        groupName: groupDetails.name,
        teacherName: groupDetails.teacher.name
      }
    });

  } catch (error) {
    console.error('Error creating group:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


const addStudentsToGroup = async (req, res) => {
  const { groupId } = req.params;
  const { studentIds } = req.body; //  array of student IDs

  if (!Array.isArray(studentIds) || studentIds.length === 0) {
      return res.status(400).json({ message: "Invalid student selection" });
  }

  try {
      // Check if students already exist in the group (optional)
      const existingMappings = await courseMapping.findAll({
          where: { courseId: groupId, studentId: studentIds }
      });

      const existingStudentIds = existingMappings.map(mapping => mapping.studentId);
      const newStudentIds = studentIds.filter(id => !existingStudentIds.includes(id));

      // Bulk insert new students only if they are not already mapped
      if (newStudentIds.length > 0) {
          const newMappings = newStudentIds.map(studentId => ({
              courseId: groupId,
              studentId: studentId
          }));

          await courseMapping.bulkCreate(newMappings);
      }

      return res.status(201).json({ message: "Students added successfully" });
  } catch (error) {
      console.error("Error adding students:", error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCourses = async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await course.findAll();

    return res.status(200).json({
      success: true,
      data: courses
    });

  } catch (error) {
    console.error('Error fetching courses:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};




module.exports =  {createCourse,addStudentsToGroup,getCourses}


