//#region 'LOCAL DEP'
const { Course, Question, Answer } = require('../../database/models');
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

module.exports = { getCourse, getQuizForCourse };
