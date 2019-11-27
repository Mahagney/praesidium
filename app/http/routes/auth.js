//#region 'NPM DEP'
const express = require('express');
const router = express.Router();
//#endregion

//#region 'LOCAL DEP'
const authController = require('../controllers/authController');
//#endregion

router.post('/login', authController.logIn);

router.get('/logout', authController.logOut);

router.post('/register', authController.register);

module.exports = router;
