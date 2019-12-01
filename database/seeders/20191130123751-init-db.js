'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert(
        'USER',
        [
          {
            ID: 1,
            FIRST_NAME: 'Robert',
            LAST_NAME: 'Mihai',
            CNP: '1940101123123',
            EMAIL: 'robert@gmail.com',
            PASSWORD: 'password',
            ONE_TIME_AUTH: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 2,
            FIRST_NAME: 'Ovidiu',
            LAST_NAME: 'Lupul',
            CNP: '1930202456456',
            EMAIL: 'ovidiu@gmail.com',
            PASSWORD: 'password',
            ONE_TIME_AUTH: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 3,
            FIRST_NAME: 'Saleh',
            LAST_NAME: 'Mahagney',
            CNP: '1921212001005',
            EMAIL: 'saleh@gmail.com',
            PASSWORD: 'password',
            ONE_TIME_AUTH: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      ),
      queryInterface.bulkInsert(
        'EMPLOYEE_TYPE',
        [
          {
            ID: 1,
            NAME: 'Programator',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 2,
            NAME: 'Sofer',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 3,
            NAME: 'Manager',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      ),
      queryInterface.bulkInsert(
        'USER_EMPLOYEE_TYPE',
        [
          {
            ID: 1,
            ID_USER: 1,
            ID_EMPLOYEE_TYPE: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 2,
            ID_USER: 2,
            ID_EMPLOYEE_TYPE: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 3,
            ID_USER: 3,
            ID_EMPLOYEE_TYPE: 3,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      ),
      queryInterface.bulkInsert(
        'COURSE_TYPE',
        [
          {
            ID: 1,
            NAME: 'Lunar',
            MONTHS_NUMBER: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 2,
            NAME: 'Trimestrial',
            MONTHS_NUMBER: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 3,
            NAME: 'Semestrial',
            MONTHS_NUMBER: 3,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      ),
      queryInterface.bulkInsert(
        'COURSE',
        [
          {
            ID: 1,
            NAME: 'Cum sa folosesti un stingator',
            PDF_URL: 'pdfUrl1',
            VIDEO_URL: 'videoUrl1',
            ID_COURSE_TYPE: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 2,
            NAME: 'Evacuarea de urgenta',
            PDF_URL: 'pdfUrl2',
            VIDEO_URL: 'videoUrl2',
            ID_COURSE_TYPE: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 3,
            NAME: 'Comportament in caz de cutremur',
            PDF_URL: 'pdfUrl3',
            VIDEO_URL: 'videoUrl3',
            ID_COURSE_TYPE: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 4,
            NAME: 'Comportament in caz de incendiu',
            PDF_URL: 'pdfUrl4',
            VIDEO_URL: 'videoUrl4',
            ID_COURSE_TYPE: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 5,
            NAME: 'Alunecarile si impiedicarile',
            PDF_URL: 'pdfUrl5',
            VIDEO_URL: 'videoUrl5',
            ID_COURSE_TYPE: 3,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 6,
            NAME: 'Cum sa nu treci strada pe rosu',
            PDF_URL: 'pdfUrl6',
            VIDEO_URL: 'videoUrl6',
            ID_COURSE_TYPE: 3,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      ),
      queryInterface.bulkInsert(
        'EMPLOYEE_TYPE_COURSE',
        [
          {
            ID: 1,
            ID_EMPLOYEE_TYPE: 1,
            ID_COURSE: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 2,
            ID_EMPLOYEE_TYPE: 1,
            ID_COURSE: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 3,
            ID_EMPLOYEE_TYPE: 1,
            ID_COURSE: 3,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 4,
            ID_EMPLOYEE_TYPE: 1,
            ID_COURSE: 4,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 5,
            ID_EMPLOYEE_TYPE: 2,
            ID_COURSE: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 6,
            ID_EMPLOYEE_TYPE: 2,
            ID_COURSE: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 7,
            ID_EMPLOYEE_TYPE: 3,
            ID_COURSE: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 8,
            ID_EMPLOYEE_TYPE: 3,
            ID_COURSE: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 9,
            ID_EMPLOYEE_TYPE: 3,
            ID_COURSE: 3,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 10,
            ID_EMPLOYEE_TYPE: 3,
            ID_COURSE: 4,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 11,
            ID_EMPLOYEE_TYPE: 3,
            ID_COURSE: 5,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ID: 12,
            ID_EMPLOYEE_TYPE: 3,
            ID_COURSE: 6,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('USER', null, {}),
      queryInterface.bulkDelete('EMPLOYEE_TYPE', null, {}),
      queryInterface.bulkDelete('USER_EMPLOYEE_TYPE', null, {}),
      queryInterface.bulkDelete('COURSE_TYPE', null, {}),
      queryInterface.bulkDelete('COURSE', null, {}),
      queryInterface.bulkDelete('EMPLOYEE_TYPE_COURSE', null, {})
    ]);
  }
};
