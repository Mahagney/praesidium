const { Router } = require('express');

const authRouter = require('./auth');
const usersRouter = require('./users');
const coursesRouter = require('./courses');
const companiesRouter = require('./companies');
const employeeTypesRouter = require('./employeeTypes');

const router = () => {
  const apiRouter = Router();

  apiRouter.use('/auth', authRouter());
  apiRouter.use('/users', usersRouter());
  apiRouter.use('/courses', coursesRouter());
  apiRouter.use('/companies', companiesRouter());
  apiRouter.use('/employeeTypes', employeeTypesRouter());

  apiRouter.get('/health', (_req, res) => res.send('Running'));

  return apiRouter;
};

module.exports = router;
