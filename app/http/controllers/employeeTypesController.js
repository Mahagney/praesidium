// #region 'LOCAL DEP'
const employeeTypeService = require('../../services/employeeTypeService');
// #endregion

// #region 'INTERFACE'

const getEmployeeTypes = (_req, res, next) =>
  employeeTypeService
    .getEmployeeTypes()
    .then((types) => res.status(200).json(types))
    .catch((error) => next(error));

const getEmployeeTypesForCourse = (req, res, next) =>
  employeeTypeService
    .getEmployeeTypesWithCourse(req.params.courseId)
    .then((types) => res.status(200).json(types))
    .catch((error) => next(error));

const deleteEmployeeType = (req, res, next) =>
  employeeTypeService
    .deleteEmployeeTypes(req.params.employeeTypeId)
    .then(() => res.status(200).json('employeeType deleted'))
    .catch((error) => next(error));

const addEmployeeType = (req, res, next) => {
  const data = req.body;
  employeeTypeService
    .addEmployeeType({ NAME: data.name, CODE: data.code })
    .then((employeeType) => res.status(200).json(employeeType))
    .catch((err) => next(err));
};

module.exports = { getEmployeeTypes, deleteEmployeeType, addEmployeeType, getEmployeeTypesForCourse };
