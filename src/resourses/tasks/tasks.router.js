const express = require('express');
const {
	getAll,
	create,
	getOne,
	update,
	deleteOne,
	deleteAll,
} = require('./tasks.service');

const router = express.Router();

router.route('/').get(async (_, res) => {
	const tasks = await getAll();
	res.send(tasks);
});

router.route('/:id').get(async (req, res) => {
	const task = await getOne(req.params.id);
	if (task) res.send(task);
	else res.status(404).send('Task not found');
});

router.route('/').post(async (req, res) => {
	const tasks = await create(req.body);
	if (tasks) res.send(tasks);
	else res.status(404).send('Column not found');
});

router.route('/:id').put(async (req, res) => {
	const tasks = await update(req.params.id, req.body);
	if (tasks) {
		res.send(tasks);
	} else res.status(404).send('Failed to update task');
});

router.route('/:id').delete(async (req, res) => {
	const tasks = await deleteOne(req.params.id);
	if (tasks) res.send(tasks);
	else res.status(404).send('Task not found');
});

module.exports = router;
