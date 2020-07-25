const Sequelize = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

class Company extends Sequelize.Model {}
Company.init(
  {
    ID: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    NAME: {
      type: Sequelize.STRING(500),
      allowNull: false,
    },

    CUI: {
      type: Sequelize.STRING(10),
      allowNull: false,
      unique: true,
    },

    DOMAIN: {
      allowNull: false,
      type: Sequelize.STRING(10),
    },

    EMAIL: {
      allowNull: false,
      type: Sequelize.STRING(20),
    },
    PHONE_NUMBER: {
      allowNull: false,
      type: Sequelize.STRING(20),
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
    modelName: 'COMPANY',
    freezeTableName: true,
  },
);

// Association

module.exports = Company;
