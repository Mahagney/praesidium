//#region 'NPM DEP'
const express = require('express');
const router = express.Router();
//#endregion

//#region 'LOCAL DEP'
const authenticateToken = require('./../middleware/authenticateToken');
const usersController = require('./../controllers/usersController');
//#endregion

router.get(
  '/:userId/courses',
  authenticateToken,
  usersController.getUserCourses
);

router.put('/:userId',
  authenticateToken,
  usersController.updateUser);

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
