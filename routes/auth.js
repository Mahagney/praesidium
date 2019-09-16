var express = require('express');
var router = express.Router();
var Users = require('../services/usersService');
var Auth = require('../controllers/authController');

router.get('/', function(req, res, next) {
    res.json({ message: 'auth' });
});

router.post('/signup', Auth.signUp);

router.post('/signin', Auth.signIn);

module.exports = router;
