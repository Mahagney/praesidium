const Sequelize = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

class Answer extends Sequelize.Model {}
Answer.init(
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

    ID_QUESTION: {
      type: Sequelize.INTEGER,
      allowNull: false
    },

    IS_CORRECT: {
      allowNull: false,
      type: Sequelize.BOOLEAN
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
    modelName: 'ANSWER',
    freezeTableName: true
  }
);

// //Association

module.exports = Answer;
