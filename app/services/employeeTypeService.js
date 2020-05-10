//#region 'NPM DEP'
const passGenerator = require('generate-password');
const sequelize = require('../../database/config/sequelizeConfig');
//#endregion

//#region 'LOCAL DEP'
const {
  EmployeeType,
  EmployeeTypeCourse,
  User,
  CourseUser,
} = require('../../database/models');
//#endregion

const getEmployeeTypes = () =>
  EmployeeType.findAll({
    where: { deletedAt: null },
  });

const getEmployeeTypesWithCourse = (courseId) => {
  return EmployeeType.findAll({
    where: { deletedAt: null },
    attributes: [
      'ID',
      'NAME',
      'CODE',
      [
        sequelize.fn('max', sequelize.col('EMPLOYEE_TYPE_COURSEs.createdAt')),
        'LAST_SENT',
      ],
    ],
    include: {
      model: EmployeeTypeCourse,
      attributes: [],
      where: { ID_COURSE: courseId },
      required: false,
    },
    group: ['EMPLOYEE_TYPE.ID'],
  });
};

const deleteEmployeeTypes = (id) => {
  return EmployeeType.findByPk(id).then((currentEmployeeType) => {
    // Check if record exists in db
    if (currentEmployeeType) {
      let newEmployeeType = { ...currentEmployeeType };
      newEmployeeType.deletedAt = new Date();
      return currentEmployeeType.update(newEmployeeType);
    }
  });
};

const addEmployeeType = (newEmployeeType) =>
  EmployeeType.create(newEmployeeType);

const getUsersWithAssignementsByCourseIdForEmployeeType = (
  employeeTypeId,
  courseId
) => {
  return EmployeeType.findByPk(employeeTypeId, {
    attributes: ['ID', 'NAME'],
    include: {
      model: User,
      attributes: ['ID', 'EMAIL'],
      as: 'users',
      include: {
        model: CourseUser,
        where: { ID_COURSE: courseId },
        required: false,
      },
    },
  });
};

module.exports = {
  getEmployeeTypes,
  deleteEmployeeTypes,
  addEmployeeType,
  getEmployeeTypesWithCourse,
  getUsersWithAssignementsByCourseIdForEmployeeType,
};
