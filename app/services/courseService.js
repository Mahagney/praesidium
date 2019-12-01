//#region 'LOCAL DEP'
//const courseModel = require('../models/Course');
const models = require('../../database/models');
//#endregion

//TEMPORARY LOGIC
const getCourses = (employeeTypes) => {
  return true;
  // return EmployeeType.findAll({
  //   where: {
  //     [Op.or]: [{authorId: 12}, {authorId: 13}]
  //   }.catch((error) => {
  //   let err = new Error(error);
  //   err.statusCode = 500;
  //   err.customMessage =
  //     'Getting courses by employee types -> COURSE SERVICE ERROR';
  //   throw err;
  // });
};

module.exports = { getCourses };
