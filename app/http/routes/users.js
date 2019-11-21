const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/authMiddleware');

// GET catalog home page.
router.get('/', authMiddleware.allowAccess, usersController.getUserByEmail);

module.exports = router;
