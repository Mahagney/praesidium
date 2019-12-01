//#region 'LOCAL DEP'
const User = require('./user.js');
const Course = require('./course.js');
const EmployeeType = require('./employeeType.js');
const CourseType = require('./courseType.js');
const UserEmployeeType = require('./userEmployeeType');
//#endregion

//#region 'Association: USER'
//-> USER_EMPLOYEE_TYPE
User.belongsToMany(EmployeeType, {
  through: UserEmployeeType,
  foreignKey: 'ID_USER',
  otherKey: 'ID_EMPLOYEE_TYPE',
  as: 'employeeTypes'
});
//#endregion

//#region 'Association: COURSE'
//-> EMPLOYEE_TYPE_COURSE
Course.belongsToMany(EmployeeType, {
  through: 'EMPLOYEE_TYPE_COURSE',
  foreignKey: 'ID_COURSE',
  otherKey: 'ID_EMPLOYEE_TYPE'
});
//#endregion

//#region 'Association: EMPLOYEE_TYPE'
//-> USER_EMPLOYEE_TYPE
EmployeeType.belongsToMany(User, {
  through: UserEmployeeType,
  foreignKey: 'ID_EMPLOYEE_TYPE',
  otherKey: 'ID_USER',
  as: 'users'
});

//-> EMPLOYEE_TYPE_COURSE
EmployeeType.belongsToMany(Course, {
  through: 'EMPLOYEE_TYPE_COURSE',
  foreignKey: 'ID_EMPLOYEE_TYPE',
  otherKey: 'ID_COURSE',
  as: 'courses'
});
//#endregion

module.exports = { User, Course, EmployeeType, CourseType, UserEmployeeType };
