//#region 'comment'
/*var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var db = {};

const sequelize = require('../config/sequelizeConfig');
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
*/
//#endregion

// const sequelize = require('../config/sequelizeConfig');

// const User = sequelize.import(__dirname + '/user.js');
// const Course = sequelize.import(__dirname + '/course.js');
// const EmployeeType = sequelize.import(__dirname + '/employeeType.js');
// const CourseType = sequelize.import(__dirname + '/courseType.js');

const User = require('./user.js');
const Course = require('./course.js');
const EmployeeType = require('./employeeType.js');
const CourseType = require('./courseType.js');

//#region 'Association: USER'
//-> USER_EMPLOYEE_TYPE
User.belongsToMany(EmployeeType, {
  through: 'USER_EMPLOYEE_TYPE',
  foreignKey: 'ID_USER',
  otherKey: 'ID_EMPLOYEE_TYPE'
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
  through: 'USER_EMPLOYEE_TYPE',
  foreignKey: 'ID_EMPLOYEE_TYPE',
  otherKey: 'ID_USER'
});

//-> EMPLOYEE_TYPE_COURSE
EmployeeType.belongsToMany(Course, {
  through: 'EMPLOYEE_TYPE_COURSE',
  foreignKey: 'ID_EMPLOYEE_TYPE',
  otherKey: 'ID_COURSE'
});
//#endregion

module.exports = { User, Course, EmployeeType, CourseType };
