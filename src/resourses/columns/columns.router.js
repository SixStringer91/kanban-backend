const express = require('express');
const router = express.Router();
const { getAll, createColumn, getColumn, deleteColumn } = require('./columns.service');

router.route('/').get(async (_, res) => {
	const columns = await getAll();
	res.send(columns);
});

router.route('/:id').get(async (req, res) => {
	const current = await getColumn(req.params.columnId);
  if (current) res.send(current);
  else  res.status(404).send('Column not found');
});

router.route('/').post(async (req, res) => {
	const newColumn = await createColumn(req.body);
	res.send(newColumn);
});

router.route('/:id').put(async (req, res) => {
	const updated = await updateColumn(req.params.id, req.body);
	if (updated) res.send(updated);
	else res.status(404).send('Column not found');
});

router.route('/:id').delete(async (req, res) => {
	const deleted = await deleteColumn(req.params.id);
  if (deleted) res.send(`column ${req.params.id} deleted`);
  else res.status(404).send('column not found');
});

module.exports = router;
