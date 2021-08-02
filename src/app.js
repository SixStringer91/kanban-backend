const express = require('express');
const tasksRouter = require('./resourses/tasks/tasks.router');
const columnsRouter = require ('./resourses/columns/columns.router');

const app = express();
app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  } 
	const origin = (req.headers.origin == 'http://localhost:3000') ? 'http://localhost:3000' : 'https://mywebsite.com'
	res.setHeader('Access-Control-Allow-Origin', origin)
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
	res.setHeader('Access-Control-Allow-Credentials', true)
  next();
});

app.use('/columns', columnsRouter);
app.use('/tasks', tasksRouter);

module.exports = app;