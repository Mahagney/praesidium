// #region 'NPM DEP'
const express = require('express');

const router = express.Router();
// #endregion

// #region 'LOCAL DEP'
const authenticateToken = require('../middleware/authenticateToken');
const authorization = require('../middleware/authorization');
const coursesController = require('../controllers/coursesController');
const { role } = require('../../utils/constants');
// #endregion

// !!!! keep in mind the order of the endpoints

router.get('/', authenticateToken, authorization(role.ADMIN), coursesController.getCoursesList);
router.get('/types', authenticateToken, authorization(role.ADMIN), coursesController.getCourseTypes);
router.delete('/:id', authenticateToken, authorization(role.ADMIN), coursesController.deleteCourse);
router.get('/:id', authenticateToken, authorization(role.ADMIN), coursesController.getCourseWithSignedUrls);
router.post('/', authenticateToken, authorization(role.ADMIN), coursesController.addCourse);

// TODO: remove ID,unused

router.get('/:id/video', authenticateToken, coursesController.getFile);
router.post('/:id/employeeType/:employeeTypeId', authenticateToken, coursesController.assignCourse);

router.get('/:id/quiz', authenticateToken, coursesController.getQuizForCourse);

router.put('/:id/user/:userId/complete', authenticateToken, coursesController.completeCourse);

module.exports = router;
