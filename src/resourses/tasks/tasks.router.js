const express = require('express');
const {
	getAll,
	getTask,
	createTask,
	updateTask,
	deleteTask,
} = require('./tasks.service');
const { getColumn, updateColumn } = require('../columns/columns.service')

const router = express.Router();

router.route('/').get(async (_, res) => {
	const tasks = await getAll();
	res.send(tasks);
});

router.route('/:id').get(async (req, res) => {
	const task = await getTask(req.params.id);
	if (task) res.send(task);
	else res.status(404).send('Task not found');
});

router.route('/:columnId').post(async (req, res) => {
	const column = await getColumn(req.params.columnId);
	if (column) {
	const task = await createTask(req.body);
	if (task) {
	res.send(task);
	column.tasks.push(task.id);
	await updateColumn(column.id, column);
	}	else res.status(404).send('Failed to create task');
}
else res.status(404).send('Column not found');
});

router.route('/:id').put(async (req, res) => {
	const task = await updateTask(req.params.id, req.body);
	if (task) {
		res.send(task);
	} else res.status(404).send('Failed to update task');
});

router.route('/:id').delete(async (req, res) => {
	const task = await deleteTask(req.params.id);
	if (task) res.send(task);
	else res.status(404).send('Task not found');
});

module.exports = router;
