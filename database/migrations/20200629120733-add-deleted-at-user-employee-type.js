'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('USER_EMPLOYEE_TYPE', 'deletedAt', {type: Sequelize.DATE,defaultValue: null}),
        queryInterface.addColumn('COMPANY', 'deletedAt', {type: Sequelize.DATE,defaultValue: null}),
        queryInterface.addColumn('COURSE', 'deletedAt', {type: Sequelize.DATE,defaultValue: null}),
        queryInterface.addColumn('COURSE_USER', 'deletedAt', {type: Sequelize.DATE,defaultValue: null})
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('USER_EMPLOYEE_TYPE', 'deletedAt'),
        queryInterface.removeColumn('COMPANY', 'deletedAt'),
        queryInterface.removeColumn('COURSE', 'deletedAt'),
        queryInterface.removeColumn('COURSE_USER', 'deletedAt')
      ])
    })
  },
};
