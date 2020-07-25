const Sequelize = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

class User extends Sequelize.Model {}
User.init(
  {
    ID: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    FIRST_NAME: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },

    LAST_NAME: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },

    CNP: {
      type: Sequelize.STRING(13),
      allowNull: false,
      validate: {
        len: [13, 13],
      },
    },

    EMAIL: {
      type: Sequelize.STRING(50),
      unique: true,
      allowNull: false,
    },

    PASSWORD: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        len: [10, 60],
      },
    },

    ONE_TIME_AUTH: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    IS_ADMIN: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    ID_COMPANY: {
      allowNull: false,
      type: Sequelize.BIGINT,
      references: {
        model: 'COMPANY',
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
    modelName: 'USER',
    freezeTableName: true,
  },
);

module.exports = User;
