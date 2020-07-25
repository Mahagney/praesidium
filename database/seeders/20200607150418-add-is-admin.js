module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkUpdate(
      'USER',
      {
        IS_ADMIN: 'true',
      },
      {
        ID: 3,
      },
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkUpdate(
      'USER',
      {
        IS_ADMIN: 'false',
      },
      {
        ID: 3,
      },
    );
  },
};
