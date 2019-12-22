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

const getVideo = (req, res, next) => {
  let videoName="video/videoplayback.mp4";
  const url = awsService.getSignedUrl(videoName)
  res.status(200).json(url);
};

//#endregion

module.exports = { getCourse, getVideo};
