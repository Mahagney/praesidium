//#region 'NPM DEP'
const express = require("express");
const router = express.Router();
//#endregion

//#region 'LOCAL DEP'
const authenticateToken = require("./../middleware/authenticateToken");
const coursesController = require("./../controllers/coursesController");
//#endregion

router.get("/", coursesController.getCourse);
router.get("/:id/video", coursesController.getVideo);
router.post("/:id/video", coursesController.uploadVideo);

module.exports = router;
