const Sequelize = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

class CourseUser extends Sequelize.Model {}
CourseUser.init(
  {
    ID: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    ID_USER: {
      allowNull: false,
      type: Sequelize.BIGINT,
      references: {
        model: 'USER',
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

    SCORE: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
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
    modelName: 'COURSE_USER',
    freezeTableName: true,
  },
);

module.exports = CourseUser;
