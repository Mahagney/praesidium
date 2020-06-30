//#region 'NPM DEP'
const express = require('express');
const router = express.Router();
//#endregion

//#region 'LOCAL DEP'
const authenticateToken = require('./../middleware/authenticateToken');
const usersController = require('./../controllers/usersController');
const authController = require('./../controllers/authController');
//#endregion

//!!!! keep in mind the order of the endpoints

router.get(
  '/:userId/courses',
  authenticateToken,
  usersController.getUserCourses
);

router.get('/:userId/course/:courseId',authenticateToken,usersController.getUserCourse)

router.put('/:userId/employeeType',
  usersController.updateUserEmployeeType);

router.put('/:userId',
  authenticateToken,
  usersController.updateUser);

router.post('/',
  authController.createUser);

router.delete('/:userId',
  authenticateToken,
  usersController.deleteUser);

router.get(
  '/:userId/courses/uncompleted',
  authenticateToken,
  usersController.getUncompletedUserCourses
);

router.get(
  '/',
  authenticateToken,
  usersController.getUsers
);
module.exports = router;
