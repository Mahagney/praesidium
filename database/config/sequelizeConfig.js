// NPM 'DEP'
const { Sequelize } = require('sequelize');

// LOCAL 'DEP'
const config = require('./config');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    dialect: config.development.dialect,
    host: config.development.host
  }
);

module.exports = sequelize;
