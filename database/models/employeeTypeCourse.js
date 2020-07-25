const Sequelize = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

class EmployeeTypeCourse extends Sequelize.Model {}
EmployeeTypeCourse.init(
  {
    ID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT,
    },
    ID_EMPLOYEE_TYPE: {
      allowNull: false,
      type: Sequelize.BIGINT,
      references: {
        model: 'EMPLOYEE_TYPE',
        key: 'ID',
      },
    },
    ID_COURSE: {
      allowNull: false,
      type: Sequelize.BIGINT,
      references: {
        model: 'COURSE',
        key: 'ID',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },

    deletedAt: {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.DATE,
    },
  },
  {
    sequelize,
    modelName: 'EMPLOYEE_TYPE_COURSE',
    freezeTableName: true,
  },
);

module.exports = EmployeeTypeCourse;
