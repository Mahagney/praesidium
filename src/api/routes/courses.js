const { Router } = require('express');

const authorization = require('../middlewares/authorization');
const authenticateToken = require('../middlewares/authenticateToken');
const {
  constants: { role },
} = require('../../config');
const {
  getFile,
  addCourse,
  deleteCourse,
  assignCourse,
  getCourseTypes,
  getCoursesList,
  completeCourse,
  getQuizForCourse,
  getCourseWithSignedUrls,
} = require('../controllers/coursesController');

const router = () => {
  const coursesRouter = Router();

  // ! Keep in mind the order of the endpoints
  coursesRouter.get('/', authenticateToken, authorization(role.ADMIN), getCoursesList);
  coursesRouter.get('/types', authenticateToken, authorization(role.ADMIN), getCourseTypes);
  coursesRouter.delete('/:id', authenticateToken, authorization(role.ADMIN), deleteCourse);
  coursesRouter.get('/:id', authenticateToken, authorization(role.ADMIN), getCourseWithSignedUrls);
  coursesRouter.post('/', authenticateToken, authorization(role.ADMIN), addCourse);

  // TODO: remove ID,unused
  coursesRouter.get('/:id/video', authenticateToken, getFile);
  coursesRouter.post('/:id/employeeType/:employeeTypeId', authenticateToken, assignCourse);
  coursesRouter.get('/:id/quiz', authenticateToken, getQuizForCourse);
  coursesRouter.put('/:id/user/:userId/complete', authenticateToken, completeCourse);

  return coursesRouter;
};

module.exports = router;
