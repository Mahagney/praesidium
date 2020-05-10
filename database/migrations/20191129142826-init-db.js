'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          'USER',
          {
            ID: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.BIGINT
            },
            FIRST_NAME: {
              type: Sequelize.STRING(50)
            },
            LAST_NAME: {
              type: Sequelize.STRING(50)
            },
            CNP: {
              type: Sequelize.STRING(13)
            },
            EMAIL: {
              type: Sequelize.STRING(40),
              unique: true
            },
            PASSWORD: {
              type: Sequelize.STRING(60)
            },
            ONE_TIME_AUTH: {
              type: Sequelize.BOOLEAN
            },
            ID_COMPANY: {
              allowNull: false,
              type: Sequelize.BIGINT,
              references: {
                model: 'COMPANY',
                key: 'ID'
              }
            },
            deletedAt: {
              allowNull: true,
              type: Sequelize.DATE
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
            }
          },
          { transaction: t }
        ),
        queryInterface.createTable(
          'EMPLOYEE_TYPE',
          {
            ID: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.BIGINT
            },
            NAME: {
              allowNull: false,
              type: Sequelize.STRING(50)
            },
            CODE: {
              allowNull: false,
              type: Sequelize.STRING(50),
              unique: true
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            deletedAt: {
              allowNull: true,
              type: Sequelize.DATE
            },
          },
          { transaction: t }
        ),
        queryInterface.createTable(
          'USER_EMPLOYEE_TYPE',
          {
            ID: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.BIGINT
            },
            ID_USER: {
              allowNull: false,
              type: Sequelize.BIGINT,
              references: {
                model: 'USER',
                key: 'ID'
              }
            },
            ID_EMPLOYEE_TYPE: {
              allowNull: false,
              type: Sequelize.BIGINT,
              references: {
                model: 'EMPLOYEE_TYPE',
                key: 'ID'
              }
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
            }
          },
          { transaction: t }
        ),
        queryInterface.createTable(
          'COURSE_TYPE',
          {
            ID: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.BIGINT
            },
            NAME: {
              allowNull: false,
              type: Sequelize.STRING(25)
            },
            MONTHS_NUMBER: {
              allowNull: false,
              type: Sequelize.INTEGER
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
            }
          },
          { transaction: t }
        ),
        queryInterface.createTable(
          'COURSE',
          {
            ID: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.BIGINT
            },
            ID_COURSE_TYPE: {
              allowNull: false,
              type: Sequelize.BIGINT,
              references: {
                model: 'COURSE_TYPE',
                key: 'ID'
              }
            },
            NAME: {
              allowNull: false,
              type: Sequelize.STRING(200)
            },
            PDF_URL: {
              allowNull: false,
              type: Sequelize.STRING(200)
            },
            VIDEO_URL: {
              allowNull: false,
              type: Sequelize.STRING(200)
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
            }
          },
          { transaction: t }
        ),
        queryInterface.createTable(
          'EMPLOYEE_TYPE_COURSE',
          {
            ID: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.BIGINT
            },
            ID_EMPLOYEE_TYPE: {
              allowNull: false,
              type: Sequelize.BIGINT,
              references: {
                model: 'EMPLOYEE_TYPE',
                key: 'ID'
              }
            },
            ID_COURSE: {
              allowNull: false,
              type: Sequelize.BIGINT,
              references: {
                model: 'COURSE',
                key: 'ID'
              }
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
            }
          },
          { transaction: t }
        ),
        queryInterface.createTable(
          'QUESTION',
          {
            ID: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.BIGINT
            },
            TEXT: {
              allowNull: false,
              type: Sequelize.STRING(500)
            },
            ID_COURSE: {
              allowNull: false,
              type: Sequelize.BIGINT,
              references: {
                model: 'COURSE',
                key: 'ID'
              }
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
            }
          },
          { transaction: t }
        ),
        queryInterface.createTable(
          'ANSWER',
          {
            ID: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.BIGINT
            },
            ID_QUESTION: {
              allowNull: false,
              type: Sequelize.BIGINT,
              references: {
                model: 'QUESTION',
                key: 'ID'
              }
            },
            TEXT: {
              allowNull: false,
              type: Sequelize.STRING(250)
            },
            IS_CORRECT: {
              allowNull: false,
              type: Sequelize.BOOLEAN
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
            }
          },
          { transaction: t }
        ),
        queryInterface.createTable(
          'COURSE_USER',
          {
            ID: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.BIGINT
            },
            ID_COURSE: {
              allowNull: false,
              type: Sequelize.BIGINT,
              references: {
                model: 'COURSE',
                key: 'ID'
              }
            },
            ID_USER: {
              allowNull: false,
              type: Sequelize.BIGINT,
              references: {
                model: 'USER',
                key: 'ID'
              }
            },
            SCORE: {
              allowNull: false,
              type: Sequelize.INTEGER,
              defaultValue: 0,
              validate: {
                min: 0,
                max: 100
              }
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
            }
          },
          { transaction: t }
        )
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable('COURSE_USER', { transaction: t }),
        queryInterface.dropTable('USER_EMPLOYEE_TYPE', { transaction: t }),
        queryInterface.dropTable('EMPLOYEE_TYPE_COURSE', { transaction: t }),
        queryInterface.dropTable('USER', { transaction: t }),
        queryInterface.dropTable('EMPLOYEE_TYPE', { transaction: t }),
        queryInterface.dropTable('ANSWER', { transaction: t }),
        queryInterface.dropTable('QUESTION', { transaction: t }),
        queryInterface.dropTable('COURSE', { transaction: t }),
        queryInterface.dropTable('COURSE_TYPE', { transaction: t })
      ]);
    });
  }
};
