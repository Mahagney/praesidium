// #region 'LOCAL DEP'
const { Course, Question, Answer, CourseUser, CourseType, EmployeeTypeCourse } = require('../database/models');
const sequelize = require('../loaders/sequelize');
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

const setQuizForCourse = async (courseId, quiz, t) => {
  const questionActions = quiz.map(async (element) =>
    Question.create(
      {
        TEXT: element.TEXT,
        ID_COURSE: courseId,
      },
      { transaction: t },
    ).then(async (question) => {
      const answerActions = element.ANSWERS.map((answer) =>
        Answer.create(
          {
            TEXT: answer.TEXT,
            IS_CORRECT: answer.IS_CORRECT,
            ID_QUESTION: question.ID,
          },
          { transaction: t },
        ),
      );
      const result = await Promise.all(answerActions);
      return result;
    }),
  );
  const result = await Promise.all(questionActions);
  return result;
};

const addCourse = async (course, quiz) => {
  const t = await sequelize.transaction();

  try {
    let newCourse = await Course.create(course, { transaction: t });
    newCourse = { ID: newCourse.ID, NAME: newCourse.NAME };
    await setQuizForCourse(newCourse.ID, quiz, t);
    await t.commit();
    return newCourse;
  } catch (error) {
    await t.rollback();
    throw error;
  }
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
  completeCourse,
  addCourse,
  getCourseTypes,
  getCoursesList,
  deleteCourse,
};
