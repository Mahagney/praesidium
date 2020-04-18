'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.bulkInsert(
          'COMPANY',
          [
            {
              NAME: 'Company1',
              CUI: 'RO403030303',
              EMAIL: 'Company1@gmail.com',
              PHONE_NUMBER: '32432432432',
              DOMAIN: 'FOOD',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              NAME: 'Company2',
              CUI: 'RO4030ewqeqw',
              EMAIL: 'Company2@gmail.com',
              PHONE_NUMBER: '02737373737',
              DOMAIN: 'SPORT',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              NAME: 'Company3',
              CUI: 'RO4030ewqeqx',
              EMAIL: 'Company3@gmail.com',
              PHONE_NUMBER: '0273754373737',
              DOMAIN: 'IT',
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ],
          { transaction: t }
        )])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.bulkDelete('COMPANY', null, { transaction: t })
      ]);
    });
  }
};
