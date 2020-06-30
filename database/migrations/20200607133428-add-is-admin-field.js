'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('USER', 'IS_ADMIN', {type: Sequelize.BOOLEAN,defaultValue: 'false'});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('USER', 'IS_ADMIN');
  }
};