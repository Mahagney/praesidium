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
  let filePath = 'video/videoplayback.mp4';
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

//#endregion

module.exports = { getCourse, getFile, uploadFile, getCourseWithSignedUrls };
