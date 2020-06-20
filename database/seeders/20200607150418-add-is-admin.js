'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkUpdate('USER', {
      IS_ADMIN: 'true',
    }, {
      ID: 3,
    },
  );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate('USER', {
      IS_ADMIN: 'false',
    }, {
      ID: 3,
    },
  );
  }
};
