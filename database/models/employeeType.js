const Sequelize = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

class EmployeeType extends Sequelize.Model {}
EmployeeType.init(
  {
    ID: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },

    NAME: {
      type: Sequelize.STRING(50),
      allowNull: false
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },

    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  },
  {
    sequelize,
    modelName: 'EMPLOYEE_TYPE',
    freezeTableName: true
  }
);

module.exports = EmployeeType;
