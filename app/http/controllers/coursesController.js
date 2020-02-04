//#region 'LOCAL DEP'
const courseService = require('./../../services/courseService');
const awsService = require('./../../services/awsService');
//#endregion

//#region 'INTERFACE'

//TEMPORARY LOGIC
const getCourse = (req, res, next) => {
  courseService.getCourse(req.courseId).then((course) => {
    res.status(200).json(course);
  });
};

const getFile = (req, res, next) => {
  const url = awsService.getSignedUrl(filePath);
  res.status(200).json(url);
};

const uploadFile = (req, res, next) => {
  awsService
    .uploadFileToS3(req.file.originalname, req.file.path)
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
};

const getCourseWithSignedUrls = (req, res, next) => {
  const courseId = req.params.id;
  courseService
    .getCourse(courseId)
    .then((selectedCourse) => {
      selectedCourse.PDF_URL = awsService.getSignedUrl(selectedCourse.PDF_URL);
      selectedCourse.VIDEO_URL = awsService.getSignedUrl(
        selectedCourse.VIDEO_URL
      );
      res.send(selectedCourse);
    })
    .catch((err) => res.send(err));
};

const getQuizForCourse = (req, res, next) => {
  const courseId = req.params.id;
  courseService
    .getQuizForCourse(courseId)
    .then((quiz) => {
      res.send(quiz);
    })
    .catch((err) => res.send(err));
};

const completeCourse = (req, res, next) => {
  courseService
    .completeCourse(req.params.id, req.params.userId, req.body.score)
    .then((result) => res.send(result))
    .catch((err) => next(err));
};
//#endregion

module.exports = {
  getCourse,
  getFile,
  uploadFile,
  getCourseWithSignedUrls,
  getQuizForCourse,
  completeCourse
};
