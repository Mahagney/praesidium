//#region 'LOCAL DEP'
const userService = require('./../../services/userService');
//#endregion

//#region 'INTERFACE'

const getUserCourses = (req, res, next) => {
  userService
    .getUserCourses(req.userId)
    .then((courses) => {
      res.status(200).json(courses);
    })
    .catch((error) => {
      const err = new Error(error);
      err.statusCode = 500;
      err.customMessage = 'Fetching courses has failed!';
      next(err);
    });
};

const getUncompletedUserCourses = (req, res, next) => {
  userService
    .getUncompletedUserCourses(req.userId)
    .then((courses) => {
      res.status(200).json(courses);
    })
    .catch((error) => {
      const err = new Error(error);
      err.statusCode = 500;
      err.customMessage = 'Fetching courses has failed!';
      next(err);
    });
};
//#endregion

module.exports = { getUserCourses, getUncompletedUserCourses };