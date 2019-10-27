var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authController');
const { makeInvoker } =  require('awilix-express')
const api = makeInvoker(Auth.makeAuthApi)

router.get('/', function(req, res, next) {
  res.json({ message: 'auth' });
});

router.post('/signup', api('signUp'));

router.post('/signin', api('signIn'));

router.get('/signout', api('signOut'));

module.exports = router;
