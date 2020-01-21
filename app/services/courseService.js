//#region 'LOCAL DEP'
const { Course } = require('../../database/models');
//#endregion

//TEMPORARY LOGIC
const getCourse = (courseId) => {
  return Course.findByPk(courseId);
};

module.exports = { getCourse };
