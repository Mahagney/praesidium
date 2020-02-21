//#region 'LOCAL DEP'
const {
  Course,
  Question,
  Answer,
  CourseUser
} = require('../../database/models');
//#endregion

//TEMPORARY LOGIC
const getCourse = (courseId) => {
  return Course.findByPk(courseId);
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

module.exports = { getCourse, getQuizForCourse, completeCourse };
