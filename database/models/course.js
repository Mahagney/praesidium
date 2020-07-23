const Sequelize = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

class Course extends Sequelize.Model {}
Course.init(
  {
    ID: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },

    ID_COURSE_TYPE: {
      allowNull: false,
      type: Sequelize.BIGINT,
      references: {
        model: 'COURSE_TYPE',
        key: 'ID'
      }
    },

    NAME: {
      type: Sequelize.STRING(200),
      allowNull: false
    },

    SLUG: {
      type: Sequelize.STRING(200),
      allowNull: false,
      unique: true
    },

    PDF_URL: {
      type: Sequelize.STRING(200),
      allowNull: false
    },

    VIDEO_URL: {
      type: Sequelize.STRING(200)
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
    modelName: 'COURSE',
    freezeTableName: true
  }
);

module.exports = Course;
