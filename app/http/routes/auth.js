const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);

router.post('/logIn', authController.logIn);

router.get('/logOut', authController.logOut);

module.exports = router;
