const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session')
var knex = require('./knex/knex');
const KnexSessionStore = require('connect-session-knex')(session);
const config = require('./config/default')
const containerMiddleware = require('./container/container').resolve('containerMiddleware')
const {ensureLoggedIn} = require('./middleware/authMiddleware')

require('dotenv').config();

const store = new KnexSessionStore({knex: knex});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const auth = require('./routes/auth.js');
const app = express();
const isSecure = app.get('env') != 'development';

const CORS_OPTIONS = config.corsOptions;
const SESSION_OPTION = config.session;

SESSION_OPTION.secret = process.env.COOKIE_SECRET;
SESSION_OPTION.secure = isSecure;
SESSION_OPTION.store = store;

app.set('port', process.env.PORT || 3000);
app.use(session(SESSION_OPTION))
app.use(cors(CORS_OPTIONS));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(containerMiddleware)

app.use('/auth', auth);
app.use('/users', ensureLoggedIn, usersRouter);
app.use('/', indexRouter);

app.use(function(err, req, res, next) {
  res.status(err.status || res.statusCode || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

module.exports = app;
