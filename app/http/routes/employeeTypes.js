//#region 'NPM DEP'
const express = require('express');
const router = express.Router();
//#endregion

//#region 'LOCAL DEP'
const employeeTypesController = require('../controllers/employeeTypesController');
const authenticateToken = require('./../middleware/authenticateToken');

//#endregion
router.get('/', authenticateToken, employeeTypesController.getEmployeeTypes);

router.post('/', authenticateToken, employeeTypesController.addEmployeeType);

router.get(
  '/course/:courseId',
  authenticateToken,
  employeeTypesController.getEmployeeTypesForCourse
);

router.delete(
  '/:employeeTypeId',
  authenticateToken,
  employeeTypesController.deleteEmployeeType
);

module.exports = router;
