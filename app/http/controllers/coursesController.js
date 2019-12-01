//#region 'LOCAL DEP'
const courseService = require('./../../services/courseService');
//#endregion

//#region 'INTERFACE'

//TEMPORARY LOGIC
const getCourse = (req, res, next) => {
  courseService.getCourse(req.courseId).then((course) => {
    res.status(200).json(course);
  });
};

//#endregion

module.exports = { getCourse };
