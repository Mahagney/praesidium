//#region 'NPM DEP'
const express = require('express');
const router = express.Router();
//#endregion

//#region 'LOCAL DEP'
const authenticateToken = require('./../middleware/authenticateToken');
const feedController = require('./../controllers/feedController');
//#endregion

router.get('/courses', authenticateToken, feedController.getCourses);

module.exports = router;
