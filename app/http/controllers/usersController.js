//#region 'LOCAL DEP'
const userService = require('./../../services/userService');
const course = require('../../utils/constants').course
const awsService = require('../../services/awsService')
//#endregion

//#region 'INTERFACE'
const getUsers = (req, res, next) => {
  userService.getUsers()
    .then(users => res.status(200).json(users))
    .catch(error => next(error));
}

const updateUser = (req, res, next) => {
  userService.updateUser(req.params.userId, req.body)
    .then(users => res.status(200).json(users))
    .catch(error => next(error));
}

const deleteUser = (req, res, next) => {
  userService.deleteUser(req.params.userId)
    .then(() => res.status(200).json("User deleted"))
    .catch(error => next(error));
}

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
    const course = await userService.getUserCourse(req.params.userId, req.params.courseId)
    res.status(200).json(
      {
        ID: course.ID,
        NAME: course.NAME,
        PDF_URL: awsService.getSignedUrl(course.PDF_URL),
        VIDEO_URL: awsService.getSignedUrl(course.VIDEO_URL)
      }
    )
  } catch (error) {
    throw error
  }
};

const getUncompletedUserCourses = (req, res, next) => {
  userService
    .getUncompletedUserCourses(req.userId,course.MIN_SCORE)
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

module.exports = {
  getUserCourses,
  getUserCourse,
  getUncompletedUserCourses,
  getUsers,
  updateUser,
  deleteUser
};
