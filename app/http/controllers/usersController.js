//#region 'LOCAL DEP'
const userService = require('./../../services/userService');
//#endregion

//#region 'INTERFACE'

const getUserCourses = (req, res, next) => {
  userService
    .getUncompletedUserCourses(req.userId)
    .then((courses) => {
      res.status(200).json(courses);
    })
    .catch((error) => {
      let err = new Error(error);
      err.statusCode = 500;
      err.customMessage = 'Fetching courses has failed!';
      next(err);
    });
};

//#endregion

module.exports = { getUserCourses };
