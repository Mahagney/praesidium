//#region 'NPM DEP'
const passGenerator = require('generate-password');
const sequelize = require('../../database/config/sequelizeConfig');
const { Op } = require("sequelize");
//#endregion

//#region 'LOCAL DEP'
const {
  User,
  Course,
  EmployeeType,
  UserEmployeeType,
  CourseUser,
  Company
} = require('../../database/models');
//#endregion

//#region 'INTERFACE'
const getUsers = () => {
  return User.findAll({
    where: {
      deletedAt: null
    },
    include: [{
      model: Company,
      attributes: ['NAME']
    }]
  });
}

const getUserByEmail = (email) => {
  return User.findOne({
    where: { EMAIL: email }
  }).catch((error) => {
    let err = new Error();
    err.statusCode = 500;
    //to do logging error object
    //err.customMessage = 'Getting user by email -> USER SERVICE ERROR';
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

const getUncompletedUserCourses = (userId, minScore) => {
  return CourseUser.findAll({
    attributes: ['ID_COURSE'],
    where: { ID_USER: userId, SCORE: { [Op.lt]: 5 } },
    include: [
      {
        model: Course,
        attributes: ['ID','NAME']
      }
    ]
  })
    .then((courses) =>
      courses
        .map((currentCourse) => ({
          ID: currentCourse.COURSE.ID,
          NAME: currentCourse.COURSE.NAME
        }))
    )
    .catch((error) => {
      let err = new Error(error);
      err.statusCode = 500;
      err.customMessage = 'Get user courses -> COURSE SERVICE ERROR';
      throw err;
    });
};

const updateUserPassword = (email, newPassword) => {
  let seqTransaction = null;
  return sequelize
    .transaction()
    .then((t) => {
      return (seqTransaction = t);
    })
    .then(() => {
      return User.update(
        { PASSWORD: newPassword },
        {
          where: {
            EMAIL: email
          },
          transaction: seqTransaction
        }
      );
    })
    .then((resultUpdatePassword) => {
      if (resultUpdatePassword[0]) {
        return User.update(
          { ONE_TIME_AUTH: 'true' },
          {
            where: {
              EMAIL: email
            },
            transaction: seqTransaction
          }
        );
      }
    })
    .then((resultUpdateOneTimeAuth) => {
      if (resultUpdateOneTimeAuth[0]) {
        return seqTransaction.commit();
      }
    })
    .then((result) => {
      if (typeof result !== 'undefined') {
        return true;
      }
    })
    .catch((error) => {
      seqTransaction.rollback();
      //LOG ERROR on server -> error.customMessage = 'Update user password -> USER SERVICE ERROR';
      throw error;
    });
};

const updateUser = (userId, user) => {
  return User.findByPk(userId)
    .then(currentUser => {
      // Check if record exists in db
      if (currentUser) {
        return currentUser.update(user)
      }
    })
}

const deleteUser = (userId) => {
  return User.findByPk(userId)
    .then(currentUser => {
      // Check if record exists in db
      if (currentUser) {
        let newUser = { ...currentUser };
        newUser.deletedAt = new Date();
        return currentUser.update(newUser)
      }
    })
}
//#endregion

module.exports = {
  getUserByEmail,
  createUser,
  updateUserPassword,
  getUserCourses,
  getUncompletedUserCourses,
  getUsers,
  updateUser,
  deleteUser
};
