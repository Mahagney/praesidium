//#region 'NPM DEP'
const bcrypt = require('bcrypt');
const saltRounds = 10;
const csv = require('fast-csv');
const fs = require('fs');
const passGenerator = require('generate-password');
//#endregion

//#region 'IMPORTED SERVICES'
const authService = require('../../services/authService');
const userService = require('../../services/userService');
const emailService = require('../../services/emailService');
//#endregion

//#region 'PRIVATE'
const readFilePromise = (filePath) => {
  const users = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(
        csv.parse({ headers: true }).transform((data) => ({
          FIRST_NAME: data.FirstName,
          LAST_NAME: data.LastName,
          CNP: data.Cnp,
          EMAIL: data.Email,
          PASSWORD: null
        }))
      )
      .on('data', (row) => {
        const user = JSON.stringify(row);
        users.push(user);
      })
      .on('end', (rowCount) => resolve(users))
      .on('error', (error) => reject(error));
  });
};
const hashPassPromise = (jsonUser) => {
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
const createUserPromise = (user) => {
  return new Promise((resolve, reject) => {
    userService
      .createUser(user)
      .then((newUserId) => {
        resolve(newUserId);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//#endregion

//#region 'INTERFACE'
const register = (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(422).json('Attached file is not CSV type!');
  }
  readFilePromise(file.path)
    .then((jsonUsers) => {
      return Promise.all(
        jsonUsers.map((jsonUser) => {
          return hashPassPromise(jsonUser);
        })
      );
    })
    .then((users) => {
      return Promise.all(
        users.map((user) => {
          return createUserPromise(user);
        })
      );
    })
    .then((usersIds) => {
      console.log(usersIds);
      return res.status(200).send('Users registered.');
    })
    .catch((error) => {
      console.log('MY PROMISE FLOW ERROR');
      console.log(error);
      return res.status(500).send('Register has failed!');
    });
};

const logIn = (req, res, next) => {
  if (authService.validateUser(req.body)) {
    userService.getUserByEmail(req.body.email).then((user) => {
      if (user) {
        bcrypt
          .compare(req.body.password, user.PASSWORD)
          .then((bcryptResult) => {
            if (bcryptResult) {
              req.session.userId = user.ID;
              res.json({ userId: user.ID, message: 'Logged in' });
            } else {
              res.status(401);
              res.json(new Error('Invalid log in '));
            }
          });
      } else {
        res.status(401);
        next(new Error('Invalid Login'));
      }
    });
  } else {
    res.status(401);
    next(new Error('Invalid Login'));
  }
};

const logOut = (req, res, next) => {
  req.session.destroy(function() {
    res.clearCookie('connect.sid');
    res.json({
      message: 'Logged out'
    });
  });
};

//#endregion

module.exports = { register, logIn, logOut };
