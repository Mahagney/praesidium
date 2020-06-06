//#region 'NPM DEP'
const express = require('express');
const router = express.Router();
//#endregion

//#region 'LOCAL DEP'
const authenticateToken = require('./../middleware/authenticateToken');
const coursesController = require('./../controllers/coursesController');
//#endregion

router.get('/', coursesController.getCoursesList);
router.post('/',  coursesController.addCourse);

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
router.get('/types', authenticateToken, coursesController.getCourseTypes);
router.get(
  '/:id',
  authenticateToken,
  coursesController.getCourseWithSignedUrls
);
router.get('/:id/quiz', authenticateToken, coursesController.getQuizForCourse);
router.post('/:id/quiz', authenticateToken, coursesController.setQuizForCourse);
router.put(
  '/:id/user/:userId/complete',
  authenticateToken,
  coursesController.completeCourse
);

module.exports = router;
