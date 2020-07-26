const { sequelize } = require('.');

module.exports = {
  development: {
    ...sequelize,
    // eslint-disable-next-line no-console
    logging: console.log,
  },
  test: {
    ...sequelize,
  },
  production: {
    ...sequelize,
  },
};
