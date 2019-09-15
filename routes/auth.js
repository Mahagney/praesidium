var express = require('express');
var router = express.Router();
var Users = require('../services/usersService');
var bcrypt = require('bcrypt');

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
            .then(user => {
                if(!user){
                    bcrypt.hash(req.body.password, 10)
                        .then((hash) => {
                            const user = {...req.body};
                            user.password = hash;
                            const id = Users
                                .create(user);
                            res.json({hash, message: "signed up"});
                        });
                }else{
                    next(new Error('Email in use'));
                }}
    )
    } else {
        next(new Error('Invalid user'))
    }
});

router.post('/signin', function(req, res, next) {
    if (validateUser(req.body)) {
        Users
            .getUserByEmail(req.body.email)
            .then(user => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password)
                        .then((result) => {
                            const isSecure = req.app.get('env') != 'development';
                            res.cookie('user_id', user.id,
                                {
                                    httpOnly: true,
                                    secure: isSecure,
                                    signed: true
                                })
                            res.json({result, message: "signed in"});
                        });
                }else {
                    next(new Error('Invalid Login'));
                }
            });
    }else {
        next(new Error('Invalid Login'));
    }
});

module.exports = router;
