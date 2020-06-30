'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('USER_EMPLOYEE_TYPE', 'deletedAt', {type: Sequelize.DATE,defaultValue: null});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('USER_EMPLOYEE_TYPE', 'deletedAt');
  }
};
