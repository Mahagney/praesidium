var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/authMiddleware');

// GET catalog home page.
router.get('/', authMiddleware.allowAccess ,usersController.getUserByEmail);


module.exports = router;
