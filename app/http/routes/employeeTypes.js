//#region 'NPM DEP'
const express = require('express');
const router = express.Router();
//#endregion

//#region 'LOCAL DEP'
const employeeTypesController = require('../controllers/employeeTypesController');

//#endregion
router.get('/', employeeTypesController.getEmployeeTypes);

router.post('/', employeeTypesController.addEmployeeType);

router.get('/course/:courseId', employeeTypesController.getEmployeeTypesForCourse);

router.delete('/:employeeTypeId', employeeTypesController.deleteEmployeeType);


module.exports = router;