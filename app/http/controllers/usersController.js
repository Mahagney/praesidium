//#region 'LOCAL DEP'
const userService = require('./../../services/userService');
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

module.exports = { getUserCourses, getUncompletedUserCourses, getUsers, updateUser, deleteUser };
