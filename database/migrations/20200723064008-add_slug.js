'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface
          .addColumn('COURSE', 'SLUG', { type: Sequelize.STRING(200) })
          .then(function () {
            return queryInterface.sequelize
              .query('UPDATE public."COURSE" SET "SLUG" = "ID"')
              .then(() =>
                queryInterface.changeColumn('COURSE', 'SLUG', {
                  allowNull: false,
                  unique: true,
                  type: Sequelize.STRING(200),
                })
              )
          }),
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([queryInterface.removeColumn('COURSE', 'SLUG')])
    })
  },
}
