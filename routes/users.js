var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

// GET catalog home page.
router.get('/', usersController.getUserByEmail);

module.exports = router;
