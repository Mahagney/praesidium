//#region 'LOCAL DEP'
const {
  Course,
  Question,
  Answer,
  CourseUser,
  CourseType
} = require('../../database/models');
const fileService = require('./fileService');
//#endregion

//TEMPORARY LOGIC
const getCourse = (courseId) => {
  return Course.findByPk(courseId);
};

const addCourse = (course) => {
  return Course.create(course).catch((error) => {
    let err = new Error(error);
    err.statusCode = 400;
    err.customMessage = 'Invalid course data';
    throw err;
  });
};

const assignVideoToCourse = (courseId, videoUrl) => {
  return Course.update(
    { VIDEO_URL: videoUrl },
    { where: { ID: courseId }, returning: true, plain: true }
  );
};

const getQuizForCourse = (courseId) => {
  return Question.findAll({
    attributes: ['ID', 'TEXT'],
    include: [
      {
        model: Answer,
        required: true,
        attributes: ['ID', 'TEXT', 'IS_CORRECT']
      }
    ],
    where: {
      ID_COURSE: courseId
    }
  });
};

const completeCourse = (courseID, userId, score) => {
  return CourseUser.create({
    ID_COURSE: courseID,
    ID_USER: userId,
    SCORE: score
  });
};

const getCourseTypes = () => {
  return CourseType.findAll({ attributes: ['ID', 'NAME', 'MONTHS_NUMBER'] });
};

module.exports = {
  getCourse,
  getQuizForCourse,
  completeCourse,
  addCourse,
  assignVideoToCourse,
  getCourseTypes
};
