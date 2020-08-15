const { Sequelize } = require('sequelize');

const logger = require('./logger');
const { sequelize: sequelizeConfig } = require('../config');

const sequelizeLogger = (...args) => {
  logger.debug({ query: args[0] }, 'sequelize log ...');
};

const sequelizeLoader = new Sequelize(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, {
  dialect: sequelizeConfig.dialect,
  host: sequelizeConfig.host,
  logging: sequelizeConfig.logging ? sequelizeLogger : false,
});

module.exports = sequelizeLoader;
