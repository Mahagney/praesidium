// #region 'LOCAL DEP'
const { Course, Question, Answer, CourseUser, CourseType, EmployeeTypeCourse } = require('../../database/models');
const sequelize = require('../../database/config/sequelizeConfig');
// #endregion

// TEMPORARY LOGIC
const getCourse = (courseId) => {
  return Course.findByPk(courseId);
};

const getCoursesList = async () => {
  return Course.findAll({
    where: {
      deletedAt: null,
    },
  }).then((courses) =>
    courses.map((currentCourse) => ({
      ID: currentCourse.ID,
      NAME: currentCourse.NAME,
    })),
  );
};

const deleteCourse = async (courseId) => {
  let seqTransaction = null;
  try {
    seqTransaction = await sequelize.transaction();

    const resultUpdateCourse = await Course.update(
      { deletedAt: new Date() },
      {
        where: {
          ID: courseId,
        },
        transaction: seqTransaction,
      },
    );

    if (!resultUpdateCourse[0]) throw new Error('resultUpdateCourse');
    await CourseUser.update(
      { deletedAt: new Date() },
      {
        where: {
          ID_COURSE: courseId,
        },
        transaction: seqTransaction,
      },
    );

    await EmployeeTypeCourse.update(
      { deletedAt: new Date() },
      {
        where: {
          ID_COURSE: courseId,
        },
        transaction: seqTransaction,
      },
    );

    return seqTransaction.commit();
  } catch (err) {
    await seqTransaction.rollback();
    throw err;
  }
};

const addCourse = async (course) => {
  return Course.create(course).catch((error) => {
    const err = new Error(error);
    err.statusCode = 400;
    err.customMessage = 'Invalid course data';
    throw err;
  });
};

const assignVideoToCourse = (courseId, videoUrl) => {
  return Course.update({ VIDEO_URL: videoUrl }, { where: { ID: courseId }, returning: true, plain: true });
};

const getQuizForCourse = (courseId) => {
  return Question.findAll({
    attributes: ['ID', 'TEXT'],
    include: [
      {
        model: Answer,
        required: true,
        attributes: ['ID', 'TEXT', 'IS_CORRECT'],
      },
    ],
    where: {
      ID_COURSE: courseId,
    },
  });
};

const setQuizForCourse = (courseId, quiz) => {
  // TODO: improve this
  const questionActions = quiz.map(async (element) => {
    return Question.create({
      TEXT: element.TEXT,
      ID_COURSE: courseId,
    }).then((question) => {
      const answerActions = element.ANSWERS.map((answer) =>
        Answer.create({
          TEXT: answer.TEXT,
          IS_CORRECT: answer.IS_CORRECT,
          ID_QUESTION: question.ID,
        }),
      );
      return Promise.all(answerActions);
    });
  });
  return Promise.all(questionActions);
};

const completeCourse = (courseId, userId, score) => {
  return CourseUser.update(
    { SCORE: score },
    { where: { ID_USER: userId, ID_COURSE: courseId }, returning: true, plain: true },
  );
};

const getCourseTypes = async () => {
  const coursesTypes = await CourseType.findAll({ attributes: ['ID', 'NAME', 'MONTHS_NUMBER'] });
  return coursesTypes;
};

const assignCourseToUsers = (courseId, userIds) => {
  const promises = [];
  userIds.forEach((userId) =>
    promises.push(
      CourseUser.create({
        ID_COURSE: courseId,
        ID_USER: userId,
      }),
    ),
  );
  return Promise.all(promises);
};

const assignCourseToEmployeeType = (courseId, employeeId) => {
  return EmployeeTypeCourse.create({
    ID_EMPLOYEE_TYPE: employeeId,
    ID_COURSE: courseId,
  });
};

module.exports = {
  assignCourseToEmployeeType,
  assignCourseToUsers,
  getCourse,
  getQuizForCourse,
  setQuizForCourse,
  completeCourse,
  addCourse,
  assignVideoToCourse,
  getCourseTypes,
  getCoursesList,
  deleteCourse,
};
