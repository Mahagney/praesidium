module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('COMPANY', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      NAME: {
        type: Sequelize.STRING,
      },
      CUI: {
        type: Sequelize.STRING,
        unique: true,
      },
      EMAIL: {
        type: Sequelize.STRING,
      },
      PHONE_NUMBER: {
        type: Sequelize.STRING,
      },
      DOMAIN: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('COMPANY');
  },
};
