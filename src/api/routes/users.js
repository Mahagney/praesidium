const { Router } = require('express');

const authorization = require('../middlewares/authorization');
const { createUser } = require('../controllers/authController');
const authenticateToken = require('../middlewares/authenticateToken');
const {
  constants: { role },
} = require('../../config');
const {
  getUsers,
  updateUser,
  deleteUser,
  getUserCourse,
  getUserCourses,
  updateUserEmployeeType,
  getUncompletedUserCourses,
} = require('../controllers/usersController');

const router = () => {
  const usersRouter = Router();

  // ! Keep in mind the order of the endpoints
  usersRouter.get('/:userId/courses', authenticateToken, getUserCourses);
  usersRouter.get('/:userId/course/:courseId', authenticateToken, getUserCourse);
  usersRouter.put('/:userId/employeeType', authenticateToken, authorization(role.ADMIN), updateUserEmployeeType);
  usersRouter.put('/:userId', authenticateToken, authorization(role.ADMIN), updateUser);
  usersRouter.post('/', authenticateToken, authorization(role.ADMIN), createUser);
  usersRouter.delete('/:userId', authenticateToken, authorization(role.ADMIN), deleteUser);
  usersRouter.get('/:userId/courses/uncompleted', authenticateToken, getUncompletedUserCourses);
  usersRouter.get('/', authenticateToken, getUsers);

  return usersRouter;
};

module.exports = router;
