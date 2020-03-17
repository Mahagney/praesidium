//#region 'NPM DEP'
const express = require('express');
const router = express.Router();
//#endregion

//#region 'LOCAL DEP'
const authenticateToken = require('./../middleware/authenticateToken');
const coursesController = require('./../controllers/coursesController');
//#endregion

router.get('/', coursesController.getCourse);
router.post('/', coursesController.addCourse);
router.get('/:id/video', authenticateToken, coursesController.getFile);
router.post('/:id/video', coursesController.uploadVideoToCourse);
router.get('/types', coursesController.getCourseTypes);
router.get('/:id', coursesController.getCourseWithSignedUrls);
router.get('/:id/quiz', authenticateToken, coursesController.getQuizForCourse);
router.put(
  '/:id/user/:userId/complete',
  authenticateToken,
  coursesController.completeCourse
);

module.exports = router;
