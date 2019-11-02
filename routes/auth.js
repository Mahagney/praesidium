const express = require('express');
const router = express.Router();
const makeAuthController = require('../controllers/authController');
const { makeInvoker } = require('awilix-express');

const api = makeInvoker(makeAuthController);

router.get('/', function(req, res, next) {
  res.json({ message: 'auth' });
});

router.post('/signup', api('signUp'));

router.post('/signin', api('signIn'));

router.get('/signout', api('signOut'));

module.exports = router;
