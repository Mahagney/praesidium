const { Sequelize } = require('sequelize');

const { sequelize: sequelizeConfig } = require('../config');

const sequelizeLoader = new Sequelize(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, {
  dialect: sequelizeConfig.dialect,
  host: sequelizeConfig.host,
});

module.exports = sequelizeLoader;
