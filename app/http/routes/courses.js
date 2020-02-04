//#region 'NPM DEP'
const express = require('express');
const router = express.Router();
//#endregion

//#region 'LOCAL DEP'
const authenticateToken = require('./../middleware/authenticateToken');
const coursesController = require('./../controllers/coursesController');
//#endregion

router.get('/', coursesController.getCourse);
router.get('/:id/video', coursesController.getFile);
router.post('/:id/video', coursesController.uploadFile);
router.get('/:id', coursesController.getCourseWithSignedUrls);
router.get('/:id/quiz', coursesController.getQuizForCourse);
router.post('/:id/user/:userId', coursesController.completeCourse);

module.exports = router;
