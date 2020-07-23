//#region 'LOCAL DEP'
const courseService = require('./../../services/courseService');
const awsService = require('./../../services/awsService');
const employeeTypeService = require('./../../services/employeeTypeService');
const utilsService = require('./../../services/utilsService')
//#endregion


const getCoursesList = (req, res, next) => {
  courseService.getCoursesList().then((courses) => {
    res.status(200).json(courses);
  });
};

const addCourse = async (req, res, next) => {
  const pdfFile = req.files.pdf[0]
  const slug = await utilsService.generateSlug(req.body.name)
  
  if (pdfFile) {
    awsService
      .uploadFileToS3(slug, pdfFile.path, 'pdf')
      .then((result) => {
        courseService
          .addCourse({
            NAME: req.body.name,
            ID_COURSE_TYPE: req.body.idCourseType,
            PDF_URL: result.path,
            VIDEO_URL: '',
            SLUG: slug + '.pdf' 
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

const deleteCourse = (req, res, next) => {
  const courseId = req.params.id;
  courseService.deleteCourse(courseId)
  .then((courses) => {
    res.status(200).json(courses)
  })    
  .catch((err) => {
    res.send(500)}
    )
}

const uploadVideoToCourse = (req, res, next) => {
  const courseId = req.params.id;
  const video = req.files.video[0];
  awsService
    .uploadFileToS3(video.originalname, video.path, 'video')
    .then((response) => {
      courseService
        .assignVideoToCourse(courseId, response.path)
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
  courseService
    .setQuizForCourse(req.params.id, req.body.quiz)
    .then((result) => res.status(200).send('quiz added'))
    .catch((error) => next(error));
};

const completeCourse = (req, res, next) => {
  courseService
    .completeCourse(req.params.id, req.params.userId, req.body.score)
    .then((result) => {
      res.json("done");
    })
    .catch((err) => next(err));
};

const getCourseTypes = (req, res, next) => {
  courseService
    .getCourseTypes()
    .then((result) => res.json({ courseTypes: result }))
    .catch((err) => next(err));
};

const assignCourse = (req, res, next) => {
  const courseId = req.params.id;
  const employeeTypeId = req.params.employeeTypeId;

  return employeeTypeService
    .getUsersWithAssignementsByCourseIdForEmployeeType(employeeTypeId, courseId)
    .then((result) => {
      let usersToAssign = result.users
        .filter((current) => (current.COURSE_USERs.length ? false : true))
        .map((current) => current.ID);

      courseService
        .assignCourseToEmployeeType(courseId, employeeTypeId)
        .then((res1) => {
          courseService
            .assignCourseToUsers(courseId, usersToAssign)
            .then((results) => res.json(results));
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
  setQuizForCourse,
  completeCourse,
  uploadVideoToCourse,
  getCourseTypes,
  getCoursesList,
  deleteCourse
};
