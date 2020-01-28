const Sequelize = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

class Question extends Sequelize.Model {}
Question.init(
  {
    ID: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },

    TEXT: {
      type: Sequelize.STRING(500),
      allowNull: false
    },

    ID_COURSE: {
      type: Sequelize.INTEGER,
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
    modelName: 'QUESTION',
    freezeTableName: true
  }
);

// //Association

module.exports = Question;
