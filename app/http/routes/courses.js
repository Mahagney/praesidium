//#region 'NPM DEP'
const express = require('express');
const router = express.Router();
//#endregion

//#region 'LOCAL DEP'
const authenticateToken = require('./../middleware/authenticateToken')
const authorization = require('./../middleware/authorization')
const coursesController = require('./../controllers/coursesController')
const role = require('./../../utils/constants').role
//#endregion

//!!!! keep in mind the order of the endpoints

router.get('/', authenticateToken, authorization(role.ADMIN), coursesController.getCoursesList)
router.get('/types', authenticateToken, authorization(role.ADMIN), coursesController.getCourseTypes)
router.get(
  '/:id',
  authenticateToken,
  authorization(role.ADMIN),
  coursesController.getCourseWithSignedUrls
);
router.post('/', 
  authenticateToken, 
  authorization(role.ADMIN), coursesController.addCourse)

//TO DO: remove ID,unused
router.get('/:id/video', authenticateToken, coursesController.getFile);
router.post(
  '/:id/employeeType/:employeeTypeId',
  authenticateToken,
  coursesController.assignCourse
);
router.post(
  '/:id/video',
  authenticateToken,
  coursesController.uploadVideoToCourse
);

router.get('/:id/quiz', 
  authenticateToken,
  coursesController.getQuizForCourse);

router.post('/:id/quiz', 
  authenticateToken, 
  authorization(role.ADMIN),
  coursesController.setQuizForCourse);

router.put(
  '/:id/user/:userId/complete',
  authenticateToken,
  coursesController.completeCourse
);

module.exports = router;
