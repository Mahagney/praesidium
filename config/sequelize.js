const { sequelize } = require('.');

module.exports = {
  development: {
    ...sequelize,
    logging: true,
  },
  test: {
    ...sequelize,
    logging: false,
  },
  production: {
    ...sequelize,
    logging: false,
  },
};
