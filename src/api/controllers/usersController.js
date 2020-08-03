// #region 'LOCAL DEP'
const userService = require('../../services/userService');
const {
  constants: { course },
} = require('../../config');
const awsService = require('../../services/awsService');
// #endregion

// #region 'INTERFACE'
const getUsers = (_req, res, next) => {
  userService
    .getUsers()
    .then((users) => res.status(200).json(users))
    .catch((error) => next(error));
};

const updateUser = (req, res, next) => {
  userService
    .updateUser(req.params.userId, req.body)
    .then((users) => res.status(200).json(users))
    .catch((error) => next(error));
};

const updateUserEmployeeType = (req, res, next) => {
  userService
    .changeEmployeeTypeForUser(req.params.userId, req.body.employeeTypeId)
    .then((users) => res.status(200).json(users))
    .catch((error) => next(error));
};

const deleteUser = (req, res, next) => {
  userService
    .deleteUser(req.params.userId)
    .then(() => res.status(200).json('User deleted'))
    .catch((error) => next(error));
};

const getUserCourses = (req, res, next) => {
  userService
    .getUserCourses(req.params.userId)
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

const getUserCourse = async (req, res, next) => {
  try {
    const userCourse = await userService.getUserCourse(req.params.userId, req.params.courseId);
    if (userCourse != null) {
      res.status(200).json({
        ID: userCourse.ID,
        NAME: userCourse.NAME,
        PDF_URL: awsService.getSignedUrl(userCourse.PDF_URL),
        VIDEO_URL: awsService.getSignedUrl(userCourse.VIDEO_URL),
      });
    } else {
      res.status(404).json(null);
    }
  } catch (error) {
    next(error);
  }
};

const getUncompletedUserCourses = (req, res, next) => {
  userService
    .getUncompletedUserCourses(req.userId, course.MIN_SCORE)
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
// #endregion

module.exports = {
  getUserCourses,
  getUserCourse,
  getUncompletedUserCourses,
  getUsers,
  updateUser,
  deleteUser,
  updateUserEmployeeType,
};
