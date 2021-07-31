const { readFile, writeFile } = require('fs').promises;
const path = require('path');
const Model = require('./tasks.model');
const TASKS_REPO = 'tasks.repository.json';

const getAll = async () => {
	const tasks = JSON.parse(
		await readFile(path.resolve(__dirname, '.', TASKS_REPO))
	);
	return tasks;
};

const getTask = async id => {
	const tasks = JSON.parse(
		await readFile(path.resolve(__dirname, '.', TASKS_REPO))
	);
	const current = tasks.find(el => el.id === id);
	console.log(current);
	return Model.toResponse(current);
};

const createTask = async body => {
	const tasks = JSON.parse(
		await readFile(path.resolve(__dirname, '.', TASKS_REPO))
	);
	const newColumn = new Model(body);
	tasks.push(newColumn);
	await writeFile(
		path.resolve(__dirname, '.', TASKS_REPO),
		JSON.stringify(tasks)
	);
	return Model.toResponse(newColumn);
};

const updateTask = async (id, body) => {
	const tasks = JSON.parse(
		await readFile(path.resolve(__dirname, '.', TASKS_REPO))
	);
	const index = tasks.findIndex(el => el.id === id);
	if (index !== -1) {
		tasks[index].title = body.title;
		tasks[index].tasks = [...body.tasks];
		await writeFile(
			path.resolve(__dirname, '.', TASKS_REPO),
			JSON.stringify(tasks)
		);
		return Model.toResponse(tasks[index]);
	}
	return null;
};

const deleteTask = async id => {
	const tasks = JSON.parse(
		await readFile(path.resolve(__dirname, '.', TASKS_REPO))
	);
	const index = tasks.findIndex(el => el.id === id);
	if (index !== -1) {
		tasks.splice(index, 1);
		await writeFile(
			path.resolve(__dirname, '.', TASKS_REPO),
			JSON.stringify(tasks)
		);
		return true;
	} else return false;
};

const deleteAll = async columnId => {
	const tasks = JSON.parse(
		await readFile(path.resolve(__dirname, '.', TASKS_REPO))
	);
	const filtered = tasks.filter(el => el.columnId !== columnId);
	await writeFile(
		path.resolve(__dirname, '.', TASKS_REPO),
		JSON.stringify(filtered)
	);
};

module.exports = {
	getAll,
	createTask,
	getTask,
	updateTask,
	deleteTask,
	deleteAll,
};
