//#region 'LOCAL DEP'
const courseService = require('./../../services/courseService');
//#endregion

//#region 'INTERFACE'

//TEMPORARY LOGIC
const getCourses = (req, res, next) => {
  courseService.getCourses(req.employeeTypes).then((courses) => {
    res.status(200).json(courses);
  });
};

//#endregion

module.exports = { getCourses };
