//#region 'NPM DEP'
const express = require('express');
const router = express.Router();
//#endregion

//#region 'LOCAL DEP'
const authenticateToken = require('./../middleware/authenticateToken');
const coursesController = require('./../controllers/coursesController');
//#endregion

router.get('/', authenticateToken, coursesController.getCourse);
router.post('/', authenticateToken, coursesController.addCourse);
router.get('/:id/video', authenticateToken, coursesController.getFile);
router.post('/:id/video', authenticateToken, coursesController.uploadFile);
router.get(
  '/:id',
  authenticateToken,
  coursesController.getCourseWithSignedUrls
);
router.get('/:id/quiz', authenticateToken, coursesController.getQuizForCourse);
router.put(
  '/:id/user/:userId/complete',
  authenticateToken,
  coursesController.completeCourse
);

module.exports = router;
