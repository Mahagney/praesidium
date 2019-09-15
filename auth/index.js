var express = require('express');
var router = express.Router();
var Users = require('../services/usersService');

router.get('/', function(req, res, next) {
    res.json({ message: 'auth' });
});

function validateUser(user) {
    const validEmail = typeof user.email == 'string' &&
        user.email.trim() != '';
    const validPassword = typeof user.password == 'string' &&
        user.password.trim() != '' && user.password.trim().length >= 6;

    return validEmail && validPassword;
}

router.post('/signup', function(req, res, next) {
    if(validateUser(req.body)) {
        Users
            .getUserByEmail(req.body.email)
            .then(user =>
                res.json({user: user, message : "signed up"})
    )
    } else {
        next(new Error('Invalid user'))
    }
});

module.exports = router;
