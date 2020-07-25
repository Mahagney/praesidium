const Sequelize = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

class CourseType extends Sequelize.Model {}
CourseType.init(
  {
    ID: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    NAME: {
      type: Sequelize.STRING(25),
      allowNull: false,
    },

    MONTHS_NUMBER: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },

    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    sequelize,
    modelName: 'COURSE_TYPE',
    freezeTableName: true,
  },
);

// Association

module.exports = CourseType;
