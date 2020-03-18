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

const addCourse = (req, res, next) => {
  const pdfFile = req.files.pdf[0];
  if (pdfFile) {
    awsService
      .uploadFileToS3(pdfFile.originalname, pdfFile.path, 'pdf')
      .then((result) => {
        courseService
          .addCourse({
            NAME: req.body.name,
            ID_COURSE_TYPE: req.body.idCourseType,
            PDF_URL: result.path,
            VIDEO_URL: ''
          })
          .then((course) => {
            res.status(200).json(course);
          })
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  } else res.status(400).json({ message: 'No pdf file' });
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

const uploadVideoToCourse = (req, res, next) => {
  const courseId = req.params.id;
  const video = req.files.video[0];
  awsService
    .uploadFileToS3(video.originalname, video.path, 'video')
    .then((response) => {
      courseService
        .assignVideoToCourse(courseId, 'video/' + video.originalname)
        .then(() => res.send(response));
    })
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

const setQuizForCourse = (req, res, next) => {
  courseService.setQuizForCourse(req.params.id, req.body.quiz);
};

const completeCourse = (req, res, next) => {
  courseService
    .completeCourse(req.params.id, req.params.userId, req.body.score)
    .then((result) => {
      res.json({ courseId: result.dataValues.ID_COURSE });
    })
    .catch((err) => next(err));
};

const getCourseTypes = (req, res, next) => {
  courseService
    .getCourseTypes()
    .then((result) => res.json({ courseTypes: result }))
    .catch((err) => next(err));
};
//#endregion

module.exports = {
  getCourse,
  addCourse,
  getFile,
  uploadFile,
  getCourseWithSignedUrls,
  getQuizForCourse,
  setQuizForCourse,
  completeCourse,
  uploadVideoToCourse,
  getCourseTypes
};
