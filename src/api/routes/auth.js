const { Router } = require('express');
const { body } = require('express-validator');

const { auth } = require('../middlewares');
const authenticateToken = require('../middlewares/authenticateToken');
const showValidationResult = require('../middlewares/showValidationResult');
const { logOut, register, updatePassword } = require('../controllers/authController');

const router = () => {
  const authRouter = Router();

  // ! Keep in mind the order of the endpoints
  authRouter.post('/login', auth.loginMiddleware);
  authRouter.get('/logout', logOut);
  authRouter.put(
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
    updatePassword,
  );

  // TODO: put auth middleware here
  authRouter.post('/register', authenticateToken, register);

  return authRouter;
};

module.exports = router;
