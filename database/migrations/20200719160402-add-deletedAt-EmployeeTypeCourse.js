module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(() => {
      return Promise.all([
        queryInterface.addColumn('EMPLOYEE_TYPE_COURSE', 'deletedAt', { type: Sequelize.DATE, defaultValue: null }),
        queryInterface.addColumn('QUESTION', 'deletedAt', { type: Sequelize.DATE, defaultValue: null }),
        queryInterface.addColumn('ANSWER', 'deletedAt', { type: Sequelize.DATE, defaultValue: null }),
      ]);
    });
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.transaction(() => {
      return Promise.all([
        queryInterface.removeColumn('EMPLOYEE_TYPE_COURSE', 'deletedAt'),
        queryInterface.removeColumn('QUESTION', 'deletedAt'),
        queryInterface.removeColumn('ANSWER', 'deletedAt'),
      ]);
    });
  },
};
