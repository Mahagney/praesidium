//#region 'NPM DEP'
const express = require('express');
const router = express.Router();
//#endregion

//#region 'LOCAL DEP'
const authenticateToken = require('./../middleware/authenticateToken');
const coursesController = require('./../controllers/coursesController');
//#endregion

router.get('/', authenticateToken, coursesController.getCourses);

module.exports = router;
