// #region 'LOCAL DEP'
const courseService = require('../../services/courseService');
const awsService = require('../../services/awsService');
const employeeTypeService = require('../../services/employeeTypeService');
const { generateSlug } = require('../../utils/usefullFunctions');
// #endregion

const getCoursesList = (_req, res, _next) => {
  courseService.getCoursesList().then((courses) => {
    res.status(200).json(courses);
  });
};

const addCourse = async (req, res, next) => {
  const pdfFile = req.files.pdf ? req.files.pdf[0] : null;
  const { quiz } = req.body;
  const slug = generateSlug(req.body.name);
  const promises = [];
  let videoName = null;

  try {
    if (pdfFile) {
      promises.push(awsService.uploadFileToS3(`${slug}.pdf`, pdfFile.path, 'pdf'));

      if (req.files.video) {
        const videoFile = req.files.video[0];
        videoName = slug + videoFile.originalname.substring(videoFile.originalname.lastIndexOf('.'));
        promises.push(awsService.uploadFileToS3(videoName, videoFile.path, 'video'));
      }

      const results = await Promise.all(promises);

      const pdfPath = results[0].path;
      const videoPath = results[1] ? results[1].path : '';

      const result = await courseService.addCourse(
        {
          NAME: req.body.name,
          ID_COURSE_TYPE: req.body.idCourseType,
          PDF_URL: pdfPath,
          VIDEO_URL: videoPath,
        },
        JSON.parse(quiz),
      );
      res.status(200).json(result);
    } else res.status(400).json({ message: 'No pdf file' });
  } catch (error) {
    next(error);
  }
};

const getFile = (_req, res, _next) => {
  // TODO: find out what is with filePath
  // eslint-disable-next-line no-undef
  const url = awsService.getSignedUrl(filePath);
  res.status(200).json(url);
};

const uploadFile = (req, res, _next) => {
  awsService
    .uploadFileToS3(req.file.originalname, req.file.path)
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
};

const deleteCourse = (req, res, _next) => {
  const courseId = req.params.id;
  courseService
    .deleteCourse(courseId)
    .then((courses) => {
      res.status(200).json(courses);
    })
    .catch(() => {
      res.send(500);
    });
};

const getCourseWithSignedUrls = (req, res, _next) => {
  const courseId = req.params.id;
  courseService
    .getCourse(courseId)
    .then((selectedCourse) => {
      const courseSelected = selectedCourse;

      courseSelected.PDF_URL = awsService.getSignedUrl(selectedCourse.PDF_URL);
      courseSelected.VIDEO_URL = awsService.getSignedUrl(selectedCourse.VIDEO_URL);
      res.send(courseSelected);
    })
    .catch((err) => res.send(err));
};

const getQuizForCourse = (req, res, _next) => {
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
    .then(() => {
      res.json('done');
    })
    .catch((err) => next(err));
};

const getCourseTypes = (_req, res, next) => {
  courseService
    .getCourseTypes()
    .then((result) => res.json({ courseTypes: result }))
    .catch((err) => next(err));
};

const assignCourse = async (req, res, next) => {
  const courseId = req.params.id;
  const { employeeTypeId } = req.params;

  return employeeTypeService
    .getUsersWithAssignementsByCourseIdForEmployeeType(employeeTypeId, courseId)
    .then((result) => {
      const usersToAssign = result.users.filter((current) => current.COURSE_USERs.length).map((current) => current.ID);

      courseService.assignCourseToEmployeeType(courseId, employeeTypeId).then(() => {
        courseService.assignCourseToUsers(courseId, usersToAssign).then((results) => res.json(results));
      });
    })
    .catch((err) => next(err));
};

module.exports = {
  addCourse,
  getFile,
  assignCourse,
  uploadFile,
  getCourseWithSignedUrls,
  getQuizForCourse,
  completeCourse,
  getCourseTypes,
  getCoursesList,
  deleteCourse,
};
