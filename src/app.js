const express = require('express');
const tasksRouter = require('./resourses/tasks/tasks.router');
const columnsRouter = require ('./resourses/columns/columns.router');

const app = express();
app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  } next();
});

app.use('/columns', columnsRouter);
app.use('/tasks', tasksRouter);

module.exports = app;