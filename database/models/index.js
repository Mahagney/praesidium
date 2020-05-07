//#region 'LOCAL DEP'
const User = require('./user.js');
const Course = require('./course.js');
const EmployeeType = require('./employeeType.js');
const CourseType = require('./courseType.js');
const UserEmployeeType = require('./userEmployeeType');
const Question = require('./question');
const Answer = require('./answer');
const CourseUser = require('./courseUser');
const Company = require('./company');
const EmployeeTypeCourse = require('./employeeTypeCourse');
//#endregion

//#region 'Association: USER'
//-> USER_EMPLOYEE_TYPE
User.belongsToMany(EmployeeType, {
  through: UserEmployeeType,
  foreignKey: 'ID_USER',
  otherKey: 'ID_EMPLOYEE_TYPE',
  as: 'employeeTypes',
});

User.belongsTo(Company, { foreignKey: 'ID_COMPANY', targetKey: 'ID' });
//#endregion

//#region 'Association: COURSE'
//-> EMPLOYEE_TYPE_COURSE
Course.belongsToMany(EmployeeType, {
  through: 'EMPLOYEE_TYPE_COURSE',
  foreignKey: 'ID_COURSE',
  otherKey: 'ID_EMPLOYEE_TYPE',
});
//#endregion

//#region 'Association: EMPLOYEE_TYPE'
//-> USER_EMPLOYEE_TYPE
EmployeeType.belongsToMany(User, {
  through: UserEmployeeType,
  foreignKey: 'ID_EMPLOYEE_TYPE',
  otherKey: 'ID_USER',
  as: 'users',
});

//-> EMPLOYEE_TYPE_COURSE
EmployeeType.belongsToMany(Course, {
  through: 'EMPLOYEE_TYPE_COURSE',
  foreignKey: 'ID_EMPLOYEE_TYPE',
  otherKey: 'ID_COURSE',
  as: 'courses',
});

Question.belongsTo(Course, { foreignKey: 'ID_COURSE', targetKey: 'ID' });
Question.hasMany(Answer, { foreignKey: 'ID_QUESTION' });
Answer.belongsTo(Question, { foreignKey: 'ID_QUESTION', targetKey: 'ID' });

CourseUser.belongsTo(User, { foreignKey: 'ID_USER', targetKey: 'ID' });
CourseUser.belongsTo(Course, { foreignKey: 'ID_COURSE', targetKey: 'ID' });
Course.hasMany(CourseUser, { foreignKey: 'ID_COURSE' });
User.hasMany(CourseUser, { foreignKey: 'ID_USER' });
CourseType.belongsTo(Course, { foreignKey: 'ID', targetKey: 'ID_COURSE_TYPE' });
//UserEmployeeType.belongsTo(EmployeeType, { foreignKey: 'ID_EMPLOYEE_TYPE', targetKey: 'ID' });
// EmployeeType.hasMany(UserEmployeeType, { foreignKey: 'ID_EMPLOYEE_TYPE' });
// Course.hasMany(EmployeeTypeCourse, {foreignKey: 'ID_COURSE'});
EmployeeType.hasMany(EmployeeTypeCourse, { foreignKey: 'ID_EMPLOYEE_TYPE' });

//#endregion

module.exports = {
  User,
  Course,
  EmployeeType,
  CourseType,
  UserEmployeeType,
  Question,
  Answer,
  CourseUser,
  Company,
  EmployeeTypeCourse,
};
