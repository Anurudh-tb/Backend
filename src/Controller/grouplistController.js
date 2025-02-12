
const { Sequelize } = require("sequelize");
const course = require("../Db/Models/course");
const courseMapping = require("../Db/Models/coursemapping");
const student = require("../Db/Models/student");
const teacher = require("../Db/Models/teacher");



courseMapping.belongsTo(student, {
    foreignKey: 'studentId',
});
courseMapping.belongsTo(course, {
    foreignKey: 'courseId'
});
course.belongsTo(teacher, {
    foreignKey: 'teacherId'
});

const getAllGroups = async (req, res, next) => {

    const {id}=req.params;

    try {


        const mappings = await courseMapping.findAll({
            include: [
                {
                    model: course,
                    include: [{ model: teacher, attributes: ['name'] }],
                    attributes: ['name']
                },
                {
                    model: student,
                    attributes:  [[Sequelize.literal("CONCAT(firstname, ' ', lastname)"), 'fullname']]
                }
            ],
            where:{
                courseId:id
            }
        });

        return res.status(200).json({ data: mappings });
    } catch (error) {
        console.error('Error fetching mappings:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = getAllGroups;
