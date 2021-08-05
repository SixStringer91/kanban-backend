const express = require('express');
const tasksRouter = require('./resourses/tasks/tasks.router');
const columnsRouter = require('./resourses/columns/columns.router');
const {
  handleError,
  uncaughtException,
  unhandledRejection
} = require('./middlewares/error.handler');
const { logerRequests } = require('./middlewares/logger');
const { headerHandler } = require('./middlewares/header.handler');

const app = express();

app.use(express.json());

app.use(logerRequests);

app.use('/', headerHandler);

app.use('/columns', columnsRouter);
app.use('/tasks', tasksRouter);

app.use((err, _, res, next) => {
  handleError(err, res);
  next();
});

process.on('uncaughtException', uncaughtException);
process.on('unhandledRejection', unhandledRejection);

module.exports = app;
