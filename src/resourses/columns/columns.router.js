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

router.route('/').get(async (_, res) => {
	const columns = await getAll();
	res.send(columns);
});

router.route('/:id').get(async (req, res) => {
	const { id } = req.params;
	const current = await getOne(id);
	if (current) res.send(current);
	else res.status(404).send('Column not found');
});

router.route('/:id/tasks').get(async (req, res) => {
	const { id } = req.params;
	const tasks = await getTasks(id);
	if (tasks) res.send(tasks);
	else res.status(404).send('Column not found');
});

router.route('/').post(async (req, res) => {
	const newColumn = await create(req.body);
	if(newColumn) res.send(newColumn);
	else res.status(404).send('no enought params to create column');
});

router.route('/:id').put(async (req, res) => {
	const column = await update(req.params.id, req.body);
	if (column) res.send(column);
	else res.status(404).send('column not found');
});

router.route('/:id').delete(async (req, res) => {
	const { id } = req.params;
	const deleted = await deleteOne(id);
	if (deleted) {
		res.send(`column ${id} deleted`);
	} else res.status(404).send('column not found');
});

module.exports = router;
