'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.bulkInsert(
          'USER',
          [
            {
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
          { transaction: t }
        ),
        queryInterface.bulkInsert(
          'EMPLOYEE_TYPE',
          [
            {
              NAME: 'Programator',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              NAME: 'Sofer',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              NAME: 'Manager',
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ],
          { transaction: t }
        ),
        queryInterface.bulkInsert(
          'USER_EMPLOYEE_TYPE',
          [
            {
              ID_USER: 1,
              ID_EMPLOYEE_TYPE: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_USER: 2,
              ID_EMPLOYEE_TYPE: 2,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_USER: 3,
              ID_EMPLOYEE_TYPE: 3,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ],
          { transaction: t }
        ),
        queryInterface.bulkInsert(
          'COURSE_TYPE',
          [
            {
              NAME: 'Lunar',
              MONTHS_NUMBER: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              NAME: 'Trimestrial',
              MONTHS_NUMBER: 2,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              NAME: 'Semestrial',
              MONTHS_NUMBER: 3,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ],
          { transaction: t }
        ),
        queryInterface.bulkInsert(
          'COURSE',
          [
            {
              NAME: 'Cum sa folosesti un stingator',
              PDF_URL: 'pdf/Fiipregatit_Ghid_Alunecare-de-teren.pdf',
              VIDEO_URL: 'video/videoplayback.mp4',
              ID_COURSE_TYPE: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              NAME: 'Evacuarea de urgenta',
              PDF_URL: 'pdf/Fiipregatit_Ghid_Alunecare-de-teren.pdf',
              VIDEO_URL: 'video/videoplayback.mp4',
              ID_COURSE_TYPE: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              NAME: 'Comportament in caz de cutremur',
              PDF_URL: 'pdf/Fiipregatit_Ghid_Alunecare-de-teren.pdf',
              VIDEO_URL: 'video/videoplayback.mp4',
              ID_COURSE_TYPE: 2,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              NAME: 'Comportament in caz de incendiu',
              PDF_URL: 'pdf/Fiipregatit_Ghid_Alunecare-de-teren.pdf',
              VIDEO_URL: 'video/videoplayback.mp4',
              ID_COURSE_TYPE: 2,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              NAME: 'Alunecarile si impiedicarile',
              PDF_URL: 'pdf/Fiipregatit_Ghid_Alunecare-de-teren.pdf',
              VIDEO_URL: 'video/videoplayback.mp4',
              ID_COURSE_TYPE: 3,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              NAME: 'Cum sa nu treci strada pe rosu',
              PDF_URL: 'pdf/Fiipregatit_Ghid_Alunecare-de-teren.pdf',
              VIDEO_URL: 'video/videoplayback.mp4',
              ID_COURSE_TYPE: 3,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ],
          { transaction: t }
        ),
        queryInterface.bulkInsert(
          'QUESTION',
          [
            {
              TEXT: 'Ce faci in caz de cutremur?',
              ID_COURSE: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              TEXT: 'Ce faci in caz de incendiu?',
              ID_COURSE: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              TEXT: 'Ce faci in caz de scurtcircuit?',
              ID_COURSE: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              TEXT: 'Ce faci in caz de inundatie?',
              ID_COURSE: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              TEXT: 'Ce faci in caz de cutremur?',
              ID_COURSE: 2,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              TEXT: 'Ce faci in caz de incendiu?',
              ID_COURSE: 2,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              TEXT: 'Ce faci in caz de scurtcircuit?',
              ID_COURSE: 2,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              TEXT: 'Ce faci in caz de inundatie?',
              ID_COURSE: 3,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ],
          { transaction: t }
        ),
        queryInterface.bulkInsert(
          'ANSWER',
          [
            {
              ID_QUESTION: 1,
              TEXT: 'Fug cat pot.',
              IS_CORRECT: false,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 1,
              TEXT: 'Stau sub masa.',
              IS_CORRECT: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 1,
              TEXT: 'Cobor cu liftul.',
              IS_CORRECT: false,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 1,
              TEXT: 'Cobor pe scari.',
              IS_CORRECT: false,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 2,
              TEXT: 'Fug cat pot.',
              IS_CORRECT: false,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 2,
              TEXT: 'Stau sub masa.',
              IS_CORRECT: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 2,
              TEXT: 'Cobor cu liftul.',
              IS_CORRECT: false,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 2,
              TEXT: 'Cobor pe scari.',
              IS_CORRECT: false,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 3,
              TEXT: 'Fug cat pot.',
              IS_CORRECT: false,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 3,
              TEXT: 'Stau sub masa.',
              IS_CORRECT: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 3,
              TEXT: 'Cobor cu liftul.',
              IS_CORRECT: false,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 3,
              TEXT: 'Cobor pe scari.',
              IS_CORRECT: false,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 4,
              TEXT: 'Fug cat pot.',
              IS_CORRECT: false,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 4,
              TEXT: 'Stau sub masa.',
              IS_CORRECT: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 4,
              TEXT: 'Cobor cu liftul.',
              IS_CORRECT: false,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 5,
              TEXT: 'Fug cat pot.',
              IS_CORRECT: false,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 5,
              TEXT: 'Stau sub masa.',
              IS_CORRECT: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 5,
              TEXT: 'Cobor cu liftul.',
              IS_CORRECT: false,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 6,
              TEXT: 'Stau sub masa.',
              IS_CORRECT: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 6,
              TEXT: 'Cobor cu liftul.',
              IS_CORRECT: false,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 7,
              TEXT: 'Stau sub masa.',
              IS_CORRECT: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 7,
              TEXT: 'Cobor cu liftul.',
              IS_CORRECT: false,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 8,
              TEXT: 'Stau sub masa.',
              IS_CORRECT: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_QUESTION: 8,
              TEXT: 'Cobor cu liftul.',
              IS_CORRECT: false,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ],
          { transaction: t }
        ),
        queryInterface.bulkInsert(
          'EMPLOYEE_TYPE_COURSE',
          [
            {
              ID_EMPLOYEE_TYPE: 1,
              ID_COURSE: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_EMPLOYEE_TYPE: 1,
              ID_COURSE: 2,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_EMPLOYEE_TYPE: 1,
              ID_COURSE: 3,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_EMPLOYEE_TYPE: 1,
              ID_COURSE: 4,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_EMPLOYEE_TYPE: 2,
              ID_COURSE: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_EMPLOYEE_TYPE: 2,
              ID_COURSE: 2,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_EMPLOYEE_TYPE: 3,
              ID_COURSE: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_EMPLOYEE_TYPE: 3,
              ID_COURSE: 2,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_EMPLOYEE_TYPE: 3,
              ID_COURSE: 3,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_EMPLOYEE_TYPE: 3,
              ID_COURSE: 4,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_EMPLOYEE_TYPE: 3,
              ID_COURSE: 5,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              ID_EMPLOYEE_TYPE: 3,
              ID_COURSE: 6,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ],
          { transaction: t }
        )
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.bulkDelete('USER', null, { transaction: t }),
        queryInterface.bulkDelete('EMPLOYEE_TYPE', null, { transaction: t }),
        queryInterface.bulkDelete('USER_EMPLOYEE_TYPE', null, {
          transaction: t
        }),
        queryInterface.bulkDelete('COURSE_TYPE', null, { transaction: t }),
        queryInterface.bulkDelete('COURSE', null, { transaction: t }),
        queryInterface.bulkDelete('EMPLOYEE_TYPE_COURSE', null, {
          transaction: t
        }),
        queryInterface.bulkDelete('QUESTION', null, { transaction: t }),
        queryInterface.bulkDelete('ANSWER', null, { transaction: t })
      ]);
    });
  }
};
