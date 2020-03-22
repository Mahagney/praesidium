//#region 'NPM DEP'
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
//#endregion

//#region 'LOCAL DEP'
const authController = require('../controllers/authController');
const authenticateToken = require('./../middleware/authenticateToken');
const showValidationResult = require('./../middleware/showValidationResult');
//#endregion

router.post('/login', authController.logIn);

router.get('/logout', authController.logOut);

router.put(
  '/update-password',
  authenticateToken,
  [
    body(
      'currentPassword',
      'Introduceti o parola intre 8 - 50 caractere. Aceasta poate sa contina doar litere si cifre.'
    ),
    body(
      'newPassword',
      'Introduceti o parola intre 8 - 50 caractere. Aceasta poate sa contina doar litere si cifre.'
    )
      .isLength({ min: 8, max: 50 })
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error('Parolele trebuie sa coincida!');
        }
        return true;
      })
  ],
  showValidationResult,
  authController.updatePassword
);

//todo : put auth middleware here
router.post('/register', authController.register);

module.exports = router;
