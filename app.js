//#region 'NPM DEP'
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const multer = require('multer');
const path = require('path');
//#endregion

//#region 'LOCAL DEP'
const config = require('./config/default');
const authRoutes = require('./app/http/routes/auth');
const usersRoutes = require('./app/http/routes/users');
const coursesRoutes = require('./app/http/routes/courses');
const companiesRouter = require('./app/http/routes/companies');
const employeeTypesRouter = require('./app/http/routes/employeeTypes');
//#endregion

require('dotenv').config(); // loading env variables to process.env

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
  if (
    file.mimetype === 'text/csv' ||
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'audio/mpeg' ||
    file.mimetype === 'video/mp4'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const app = express();
const isSecure = app.get('env') != 'development';

const CORS_OPTIONS = config.corsOptions;
//#endregion
//#region 'MIDDLEWARES'

app.use(cors(CORS_OPTIONS));
app.use(express.json()); //it includes body-parser
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(
  multer({ storage: fileStorage, fileFilter: filter }).fields([
    { name: 'video', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
  ])
);
//#endregion

//ROUTES
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/courses', coursesRoutes);
app.use('/companies', companiesRouter);
app.use('/employeeTypes', employeeTypesRouter);

app.get('/health', (req,res,next) => res.send("Running"));

//global error handler for the app
app.use((error, req, res, next) => {
  console.log('APP CATCH');
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.customMessage;
  res.status(status).json({ message: message });
});

module.exports = app;
