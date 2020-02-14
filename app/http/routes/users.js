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

router.get(
  '/:userId/courses/uncompleted',
  authenticateToken,
  usersController.getUncompletedUserCourses
);
module.exports = router;
