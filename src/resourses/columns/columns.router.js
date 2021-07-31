const express = require('express');
const router = express.Router();
const {
	getAll,
	createColumn,
	getColumn,
	updateColumn,
	deleteColumn,
	clearAllTasks,
} = require('./columns.service');

const { deleteAll, getTask } = require('../tasks/tasks.service');

router.route('/').get(async (_, res) => {
	const columns = await getAll();
	res.send(columns);
});

router.route('/:id').get(async (req, res) => {
	const { id } = req.params;
	const current = await getColumn(id);
	if (current) res.send(current);
	else res.status(404).send('Column not found');
});

router.route('/').post(async (req, res) => {
	const newColumn = await createColumn(req.body);
	res.send(newColumn);
});

router.route('/:id/tasks/:taskId').put(async (req, res) => {
	const { id, taskId } = req.params;
	const task = await getTask(taskId);
	if (task) {
		await clearAllTasks(taskId);
		const updated = await updateColumn(id, req.body);
		if (updated) res.send(updated);
		else res.status(404).send('Column not found');
	} else res.status(404).send('Task not found');
});

router.route('/:id').delete(async (req, res) => {
	const { id } = req.params;
	const deleted = await deleteColumn(id);
	if (deleted) {
		await deleteAll(id);
		res.send(`column ${id} deleted`);
	} else res.status(404).send('column not found');
});

module.exports = router;
