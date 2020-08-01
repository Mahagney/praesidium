// #region 'NPM DEP'
const passGenerator = require('generate-password');
const { Op } = require('sequelize');
const sequelize = require('../loaders/sequelize');
// #endregion

// #region 'LOCAL DEP'
const { User, Course, EmployeeType, UserEmployeeType, CourseUser, Company } = require('../database/models');
// #endregion

// #region 'INTERFACE'
const getUsers = () => {
  return User.findAll({
    attributes: ['ID', 'FIRST_NAME', 'LAST_NAME', 'CNP', 'EMAIL', 'ID_COMPANY', 'IS_ADMIN'],
    where: {
      deletedAt: null,
    },
    include: [
      {
        model: Company,
        attributes: ['ID', 'NAME'],
      },
      {
        model: EmployeeType,
        through: {
          where: {
            deletedAt: null,
          },
        },
        as: 'employeeTypes',
        attributes: ['ID', 'CODE'],
        where: { deletedAt: null },
      },
    ],
  });
};

const getUserByEmail = async (email) => {
  return User.findOne({
    where: { EMAIL: email },
  }).catch(() => {
    const err = new Error();
    err.statusCode = 500;
    // TODO: logging error object
    // err.customMessage = 'Getting user by email -> USER SERVICE ERROR';
    throw err;
  });
};

const createUser = async (jsonUser, sendEmail) => {
  let seqTransaction = null;
  let employeeTypeDb = null;
  let createdUser = null;
  const user = jsonUser;

  return sequelize
    .transaction()
    .then((t) => {
      seqTransaction = t;
    })
    .then(() => {
      return EmployeeType.findOne({
        where: { ID: user.ID_EMPLOYEE_TYPE },
      });
    })
    .then((employeeType) => {
      employeeTypeDb = employeeType;
      const newUser = {
        FIRST_NAME: user.FIRST_NAME,
        LAST_NAME: user.LAST_NAME,
        CNP: user.CNP,
        EMAIL: user.EMAIL,
        ID_COMPANY: user.ID_COMPANY,
      };
      const userPassword = passGenerator.generate({
        length: 10,
        numbers: true,
      });
      newUser.PASSWORD = userPassword;
      const userToReturn = User.create(newUser, { transaction: seqTransaction });
      return userToReturn;
    })
    .then((userDb) => {
      createdUser = userDb;
      const newUserEmployeeType = {
        ID_USER: userDb.ID,
        ID_EMPLOYEE_TYPE: employeeTypeDb.ID,
      };
      return UserEmployeeType.create(newUserEmployeeType, {
        transaction: seqTransaction,
      });
    })
    .then(() => {
      return sendEmail(createdUser);
    })
    .then(() => {
      return seqTransaction.commit();
    })
    .then(() => {
      return createdUser;
    })
    .catch(() => {
      return seqTransaction.rollback();
      // let err = new Error(error);
      // err.statusCode = 500;
      // err.customMessage = 'Creating user -> USER SERVICE ERROR';
      // throw err;
    });
};

const getUserCourses = async (userId) => {
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
            through: { attributes: [] },
          },
        ],
      },
    ],
  })
    .then((user) => {
      const courses = [];
      user.employeeTypes.forEach((employeeType) => {
        courses.push(...employeeType.courses);
      });
      return courses;
    })
    .catch((error) => {
      const err = new Error(error);
      err.statusCode = 500;
      err.customMessage = 'Get user courses -> COURSE SERVICE ERROR';
      throw err;
    });
};

const getUserCourse = async (userId, courseId) => {
  try {
    const userCourse = await CourseUser.findOne({
      attributes: ['ID_COURSE'],
      where: {
        ID_USER: userId,
        ID_COURSE: courseId,
      },
      include: [
        {
          model: Course,
          attributes: ['ID', 'NAME', 'VIDEO_URL', 'PDF_URL'],
        },
      ],
    });

    if (userCourse != null) {
      return {
        ID: userCourse.COURSE.ID,
        NAME: userCourse.COURSE.NAME,
        PDF_URL: userCourse.COURSE.PDF_URL,
        VIDEO_URL: userCourse.COURSE.VIDEO_URL,
      };
    }
    return null;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

const getUncompletedUserCourses = async (userId, minScore) => {
  return CourseUser.findAll({
    attributes: ['ID_COURSE'],
    where: { ID_USER: userId, SCORE: { [Op.lt]: minScore } },
    include: [
      {
        model: Course,
        attributes: ['ID', 'NAME'],
      },
    ],
  })
    .then((courses) =>
      courses.map((currentCourse) => ({
        ID: currentCourse.COURSE.ID,
        NAME: currentCourse.COURSE.NAME,
      })),
    )
    .catch((error) => {
      const err = new Error(error);
      err.statusCode = 500;
      err.customMessage = 'Get user courses -> COURSE SERVICE ERROR';
      throw err;
    });
};

const updateUserPassword = (email, newPassword) => {
  let seqTransaction = null;
  return (
    sequelize
      .transaction()
      .then((t) => {
        seqTransaction = t;
      })
      .then(() => {
        return User.update(
          { PASSWORD: newPassword },
          {
            where: {
              EMAIL: email,
            },
            transaction: seqTransaction,
          },
        );
      })
      // TODO: find out what happens on else (what to return)
      // eslint-disable-next-line consistent-return
      .then((resultUpdatePassword) => {
        if (resultUpdatePassword[0]) {
          return User.update(
            { ONE_TIME_AUTH: 'true' },
            {
              where: {
                EMAIL: email,
              },
              transaction: seqTransaction,
            },
          );
        }
      })
      // TODO: find out what happens on else (what to return)
      // eslint-disable-next-line consistent-return
      .then((resultUpdateOneTimeAuth) => {
        if (resultUpdateOneTimeAuth[0]) {
          return seqTransaction.commit();
        }
      })
      // TODO: find out what happens on else (what to return)
      // eslint-disable-next-line consistent-return
      .then((result) => {
        if (typeof result !== 'undefined') {
          return true;
        }
      })
      .catch((error) => {
        seqTransaction.rollback();
        // LOG ERROR on server -> error.customMessage = 'Update user password -> USER SERVICE ERROR';
        throw error;
      })
  );
};

const updateUser = (userId, user) => {
  // TODO: find out what happens on else (what to return)
  // eslint-disable-next-line consistent-return
  return User.findByPk(userId).then((currentUser) => {
    // Check if record exists in db
    if (currentUser) {
      return currentUser.update(user);
    }
  });
};

const deleteUser = async (userId) => {
  // TODO: find out what happens on else (what to return)
  // eslint-disable-next-line consistent-return
  return User.findByPk(userId).then((currentUser) => {
    // Check if record exists in db
    if (currentUser) {
      const newUser = { ...currentUser };
      newUser.deletedAt = new Date();
      return currentUser.update(newUser);
    }
  });
};

// TODO: find out what happens on catch (what to return)
// eslint-disable-next-line consistent-return
const changeEmployeeTypeForUser = async (userId, employeeTypeId) => {
  const t = await sequelize.transaction();

  try {
    const deletedDate = new Date();
    await UserEmployeeType.update(
      { deletedAt: deletedDate },
      { where: { deletedAt: null, ID_USER: userId } },
      { transaction: t },
    );
    const result = await UserEmployeeType.create(
      { ID_USER: userId, ID_EMPLOYEE_TYPE: employeeTypeId },
      { transaction: t },
    );
    await t.commit();

    return result;
  } catch (error) {
    await t.rollback();
  }
};
// #endregion

module.exports = {
  getUserByEmail,
  createUser,
  updateUserPassword,
  getUserCourses,
  getUserCourse,
  getUncompletedUserCourses,
  getUsers,
  updateUser,
  deleteUser,
  changeEmployeeTypeForUser,
};