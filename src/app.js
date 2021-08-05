const express = require('express');
const tasksRouter = require('./resourses/tasks/tasks.router');
const columnsRouter = require ('./resourses/columns/columns.router');
const { handleError, uncaughtException, unhandledRejection } = require('./middlewares/error.handler');
const { logerRequests } = require('./middlewares/logger');

const app = express();
app.use(express.json());

app.use(logerRequests);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  } 
	const origin = (req.headers.origin === 'http://localhost:3000') 
  ? 'http://localhost:3000' : 'https://kaban-board.netlify.app'
	res.setHeader('Access-Control-Allow-Origin', origin)
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
	res.setHeader('Access-Control-Allow-Credentials', true)
  next();
});

app.use('/columns', columnsRouter);
app.use('/tasks', tasksRouter);

app.use((err, _, res, next) => {
  handleError(err, res);
  next();
});

process.on('uncaughtException', uncaughtException);
process.on('unhandledRejection', unhandledRejection);

module.exports = app;