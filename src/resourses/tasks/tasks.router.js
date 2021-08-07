const express = require('express');
const {
  getAll,
  create,
  getOne,
  update,
  deleteOne
} = require('./tasks.service');
const { ErrorHandler } = require('../../middlewares/error.handler');

const router = express.Router();

router.route('/').get(async (_, res) => {
  const tasks = await getAll();
  res.send(tasks);
});

router.route('/:id').get(async (req, res, next) => {
  const task = await getOne(req.params.id);
  if (task) res.send(task);
  else next(new ErrorHandler(404, 'Tasks not found'));
});

router.route('/').post(async (req, res, next) => {
  const tasks = await create(req.body);
  if (tasks) res.send(tasks);
  else next(new ErrorHandler(404, 'Column not found'));
});

router.route('/:id').put(async (req, res, next) => {
  const tasks = await update(req.params.id, req.body);
  if (tasks) {
    res.send(tasks);
  } else next(new ErrorHandler(404, 'Bad result'));
});

router.route('/:id').delete(async (req, res, next) => {
  const tasks = await deleteOne(req.params.id);
  if (tasks) res.send(tasks);
  else next(new ErrorHandler(404, 'Tasks not found'));
});

module.exports = router;
