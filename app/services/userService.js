//#region 'NPM DEP'
const passGenerator = require('generate-password');
const sequelize = require('../../database/config/sequelizeConfig');
//#endregion

//#region 'LOCAL DEP'
const {
  User,
  Course,
  EmployeeType,
  UserEmployeeType
} = require('../../database/models');
//#endregion

//#region 'INTERFACE'
const getUserByEmail = (email) => {
  return User.findOne({
    where: { EMAIL: email }
  }).catch((error) => {
    let err = new Error(error);
    err.statusCode = 500;
    err.customMessage = 'Getting user by email -> USER SERVICE ERROR';
    throw err;
  });
};

const createUser = (jsonUser) => {
  let seqTransaction = null;
  let employeeTypeDb = null;
  let createdUser = null;
  const user = JSON.parse(jsonUser);

  return sequelize
    .transaction()
    .then((t) => {
      return (seqTransaction = t);
    })
    .then(() => {
      return EmployeeType.findOne({
        where: {
          NAME:
            user.EmployeeType.charAt(0).toUpperCase() +
            user.EmployeeType.slice(1)
        }
      });
    })
    .then((employeeType) => {
      employeeTypeDb = employeeType;
      let newUser = {
        FIRST_NAME: user.FIRST_NAME,
        LAST_NAME: user.LAST_NAME,
        CNP: user.CNP,
        EMAIL: user.EMAIL
      };
      const userPassword = passGenerator.generate({
        length: 10,
        numbers: true
      });
      newUser.PASSWORD = userPassword;

      return User.create(newUser, { transaction: seqTransaction });
    })
    .then((userDb) => {
      createdUser = userDb;
      const newUserEmployeeType = {
        ID_USER: userDb.ID,
        ID_EMPLOYEE_TYPE: employeeTypeDb.ID
      };
      return UserEmployeeType.create(newUserEmployeeType, {
        transaction: seqTransaction
      });
    })
    .then(() => {
      return seqTransaction.commit();
    })
    .then(() => {
      return createdUser;
    })
    .catch((error) => {
      return seqTransaction.rollback();
      // let err = new Error(error);
      // err.statusCode = 500;
      // err.customMessage = 'Creating user -> USER SERVICE ERROR';
      // throw err;
    });
};

const getUserCourses = (userId) => {
  return User.findByPk(userId, {
    include: [
      {
        model: EmployeeType,
        as: 'employeeTypes',
        include: [
          {
            model: Course,
            as: 'courses',
            attributes: ['ID', 'NAME'],
            through: { attributes: [] }
          }
        ]
      }
    ]
  })
    .then((user) => {
      let courses = [];
      user.employeeTypes.map((employeeType) => {
        courses.push(...employeeType.courses);
      });
      return courses;
    })
    .catch((error) => {
      let err = new Error(error);
      err.statusCode = 500;
      err.customMessage = 'Get user courses -> COURSE SERVICE ERROR';
      throw err;
    });
};
//#endregion

module.exports = { getUserByEmail, createUser, getUserCourses };
