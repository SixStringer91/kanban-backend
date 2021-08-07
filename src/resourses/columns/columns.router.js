const express = require('express');

const router = express.Router();
const {
  getAll,
  create,
  getOne,
  update,
  deleteOne,
  getTasks
} = require('./columns.service');
const { ErrorHandler } = require('../../middlewares/error.handler');

router.route('/').get(async (_, res) => {
  const columns = await getAll();
  res.send(columns);
});

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  const current = await getOne(id);
  if (current) res.send(current);
  else next(new ErrorHandler(404, 'Column not found'));
});

router.route('/:id/tasks').get(async (req, res, next) => {
  const { id } = req.params;
  const tasks = await getTasks(id);
  if (tasks) res.send(tasks);
  else next(new ErrorHandler(404, 'Column not found'));
});

router.route('/').post(async (req, res, next) => {
  const newColumn = await create(req.body);
  if (newColumn) res.send(newColumn);
  else next(new ErrorHandler(404, 'Bad result'));
});

router.route('/:id').put(async (req, res, next) => {
  const column = await update(req.params.id, req.body);
  if (column) res.send(column);
  else next(new ErrorHandler(404, 'Column not found'));
});

router.route('/:id').delete(async (req, res, next) => {
  const { id } = req.params;
  const deleted = await deleteOne(id);
  if (deleted) {
    res.send(`column ${id} deleted`);
  } else next(new ErrorHandler(404, 'Column not found'));
});

module.exports = router;
