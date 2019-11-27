//#region 'LOCAL DEP'
const courseService = require('./../../services/courseService');
//#endregion

//#region 'INTERFACE'

//TEMPORARY LOGIC
const getCourses = (req, res, next) => {
  courseService.getUsers().then((users) => {
    res.status(200).json(users);
  });
};

//#endregion

module.exports = { getCourses };
