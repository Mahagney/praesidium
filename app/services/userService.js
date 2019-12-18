//#region 'NPM DEP'
const passGenerator = require('generate-password');
//#endregion

//#region 'LOCAL DEP'
const { User, Course, EmployeeType } = require('../../database/models');
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
  const userPassword = passGenerator.generate({
    length: 10,
    numbers: true
  });

  user = JSON.parse(jsonUser);
  user.PASSWORD = userPassword;

  return User.create(user).catch((error) => {
    let err = new Error(error);
    err.statusCode = 500;
    err.customMessage = 'Creating user -> USER SERVICE ERROR';
    throw err;
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
