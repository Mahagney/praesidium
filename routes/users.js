var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/authMiddleware');

// GET catalog home page.
router.get('/', authMiddleware.allowAccess ,usersController.getUserByEmail);

router.get('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.json({
    message: 'logged out'
  })
})

module.exports = router;
