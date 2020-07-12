const Sequelize = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

class UserEmployeeType extends Sequelize.Model { }
UserEmployeeType.init(
  {
    ID: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },

    ID_USER: {
      allowNull: false,
      type: Sequelize.BIGINT,
      references: {
        model: 'USER',
        key: 'ID'
      }
    },

    ID_EMPLOYEE_TYPE: {
      allowNull: false,
      type: Sequelize.BIGINT,
      references: {
        model: 'EMPLOYEE_TYPE',
        key: 'ID'
      }
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },

    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },

    deletedAt: {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.DATE
    }
  },
  {
    sequelize,
    modelName: 'USER_EMPLOYEE_TYPE',
    freezeTableName: true
  }
);

module.exports = UserEmployeeType;
