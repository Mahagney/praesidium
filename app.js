//#region 'NPM DEP'
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
//#endregion

//#region 'LOCAL DEP'
const knex = require('./knex/knex');
const config = require('./config/default');
const authRouter = require('./app/http/routes/auth');
const indexRouter = require('./app/http/routes/index');
const usersRouter = require('./app/http/routes/users');
const { ensureLoggedIn } = require('./app/http/middleware/authMiddleware');
//#endregion

require('dotenv').config();

//#region 'INITS'
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '_' + file.originalname
    );
  }
});
const filter = (req, file, cb) => {
  if (file.mimetype === 'text/csv') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const store = new KnexSessionStore({ knex: knex });
const app = express();
const isSecure = app.get('env') != 'development';

const CORS_OPTIONS = config.corsOptions;
const SESSION_OPTION = config.session;

SESSION_OPTION.secret = process.env.COOKIE_SECRET;
SESSION_OPTION.secure = isSecure;
SESSION_OPTION.store = store;
//#endregion

//#region 'MIDDLEWARES'
app.set('port', process.env.PORT || 3000);
app.use(cors(CORS_OPTIONS));
app.use(express.json()); //it includes body-parser
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(multer({ storage: fileStorage, fileFilter: filter }).single('csvFile'));
app.use(session(SESSION_OPTION));
//#endregion

//ROUTES
app.use('/auth', authRouter);
app.use('/users', ensureLoggedIn, usersRouter);
app.use('/', indexRouter);

//global error handler for the app
app.use((error, req, res, next) => {
  console.log('APP CATCH');
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

module.exports = app;
