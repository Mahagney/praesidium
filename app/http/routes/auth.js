// #region 'NPM DEP'
const express = require('express');

const router = express.Router();
const { body } = require('express-validator');
// #endregion

// #region 'LOCAL DEP'
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');
const showValidationResult = require('../middleware/showValidationResult');
// #endregion

// !!!! keep in mind the order of the endpoints

router.post('/login', authController.logIn);

router.get('/logout', authController.logOut);

router.put(
  '/update-password',
  authenticateToken,
  [
    body('currentPassword', 'Parola curenta depaseste lungimea maxima permisa!').trim().isLength({ max: 50 }),

    body('newPassword', 'Introduceti o parola care sa contina minim 8 caractere!').trim().isLength({ min: 8 }),

    body('newPassword', 'Noua parola depaseste lungimea maxima permisa!').trim().isLength({ max: 50 }),

    body('confirmNewPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error('Este gresita confirmarea parolei!');
        }
        return true;
      }),
  ],
  showValidationResult,
  authController.updatePassword,
);

// TODO: put auth middleware here
router.post('/register', authenticateToken, authController.register);

module.exports = router;
