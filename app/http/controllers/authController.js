//#region 'NPM DEP'
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
//#endregion

//#region 'LOCAL DEP'
const userService = require('../../services/userService');
const emailService = require('../../services/emailService');
const fileService = require('../../services/fileService');
//#endregion

//#region 'PRIVATE'
const hashPasswordPromise = (jsonUser) => {
  const user = JSON.parse(jsonUser);
  return new Promise((resolve, reject) => {
    const userPassword = passGenerator.generate({
      length: 10,
      numbers: true
    });
    bcrypt
      .hash(userPassword, 10)
      .then((hash) => {
        user.PASSWORD = hash;
        resolve(user);
      })
      .catch((error) => reject(error));
  });
};
//#endregion

//#region 'INTERFACE'
const register = (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(422).json('Attached file is not CSV type!');
  }

  fileService
    .readFilePromise(file.path)
    .then((jsonUsers) => {
      return Promise.all(
        jsonUsers.map((jsonUser) => {
          return userService.createUser(jsonUser);
        })
      );
    })
    .then((createdUsers) => {
      console.log(createdUsers);
      return Promise.all(
        createdUsers.map((createUser) => {
          return emailService.sendEmail(createUser);
        })
      );
    })
    .then((emails) => {
      console.log(emails);
      res.status(201).json('Users created.');
    })
    .catch((error) => {
      let err = new Error(error);
      err.statusCode = 500;
      err.customMessage = 'Register has failed!';
      next(err);
    });
};

const logIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    const err = new Error('Authentication failed!');
    err.statusCode = 401;
    throw err;
  }
  let loadedUser;
  userService
    .getUserByEmail(email)
    .then((user) => {
      if (!user) {
        const err = new Error('Authentication failed!');
        err.statusCode = 401;
        throw err;
      }
      loadedUser = user;
      if (user.ONE_TIME_AUTH) {
        return bcrypt.compare(password, user.PASSWORD);
      } else if (user.PASSWORD === password) {
        return true;
      }
    })
    .then((isAuth) => {
      if (!isAuth) {
        const err = new Error('Authentication failed!');
        err.statusCode = 401;
        throw err;
      }

      const token = jwt.sign(
        {
          id: loadedUser.ID,
          email: loadedUser.EMAIL
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({ token: token, userId: loadedUser.ID });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

const logOut = (req, res, next) => {
  res.status(200).json('Logged out.');
};

//#endregion

module.exports = { register, logIn, logOut };
