const { Router } = require('express');

const authenticateToken = require('../middlewares/authenticateToken');
const {
  addEmployeeType,
  getEmployeeTypes,
  deleteEmployeeType,
  getEmployeeTypesForCourse,
} = require('../controllers/employeeTypesController');

const router = () => {
  const employeeTypesRouter = Router();

  // ! Keep in mind the order of the endpoints
  employeeTypesRouter.get('/', authenticateToken, getEmployeeTypes);
  employeeTypesRouter.post('/', authenticateToken, addEmployeeType);
  employeeTypesRouter.get('/course/:courseId', authenticateToken, getEmployeeTypesForCourse);
  employeeTypesRouter.delete('/:employeeTypeId', authenticateToken, deleteEmployeeType);

  return employeeTypesRouter;
};

module.exports = router;
