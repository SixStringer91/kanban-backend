const { readFile, writeFile } = require('fs').promises;
const path = require('path');
const Column = require('./models/column.model');
const Task = require('./models/task.model');
const COL_REPO = 'columns.repository.json';
const TASKS_REPO = 'tasks.repository.json';

const readRepo = async repo =>
	JSON.parse(await readFile(path.resolve(__dirname, 'db', repo)));
const writeRepo = async (repo, array) =>
	await writeFile(path.resolve(__dirname, 'db', repo), JSON.stringify(array));

const inAnotherColumnHandler = (index, body, tasks) => {
	const updated = { ...tasks[index], ...body };
	tasks.splice(index, 1);
	const prevColumnTasks = tasks
		.filter(task => task.columnId === prevColId)
		.sort((a, b) => a.order - b.order);
	const newColumnTasks = tasks
		.filter(task => task.columnId === body.columnId)
		.sort((a, b) => a.order - b.order);
	newColumnTasks.splice(+body.order, 0, updated);
	return [
		...tasks.filter(
			task => task.columnId !== body.columnId && task.columnId !== prevColId
		),
		...prevColumnTasks.map((task, i) => ({ ...task, order: i })),
		...newColumnTasks.map((task, i) => ({ ...task, order: i })),
	];
} 

const inSameColumnHandler = (index, body, tasks) => {
	const updated = { ...tasks[index], ...body };
	tasks.splice(index, 1);
	const newColumnTasks = tasks
		.filter(task => task.columnId === body.columnId)
		.sort((a, b) => a.order - b.order);
	newColumnTasks.splice(+body.order, 0, updated);
	return [
		...tasks.filter(
			task => task.columnId !== body.columnId
		),
		...newColumnTasks.map((task, i) => ({ ...task, order: i })),
	];
}

const tasksHandler = (id, body, tasks) => {
	const currentIndex = tasks.findIndex(task => task.id === id);
	const prevColId = tasks[currentIndex].columnId;
	return prevColId === body.columnId 
	?	inSameColumnHandler(currentIndex, body, tasks)
	:	inAnotherColumnHandler(currentIndex, body, tasks);
};

const getAllColumns = async () => readRepo(COL_REPO);

const getColumn = async id => {
	const current = (await readRepo(COL_REPO)).find(el => el.id === id);
	return Column.toResponse(current);
};

const getTasksByColumn = async columnId => {
	const column = (await readRepo(COL_REPO)).find(el => el.id === columnId);
	if (column) {
		const tasks = await readRepo(TASKS_REPO);
		return tasks
			.filter(task => task.columnId === columnId)
			.map(Task.toResponse);
	}
	return null;
};

const createColumn = async body => {
	const columns = await readRepo(COL_REPO);
	const newColumn = new Column(body);
	columns.push(newColumn);
	await writeRepo(COL_REPO, columns);
	return Column.toResponse(newColumn);
};

const updateColumn = async (id, body) => {
	const columns = await readRepo(COL_REPO);
	const index = columns.findIndex(col => col.id === id);
	console.log(id);
	if (index !== -1) {
		columns[index].title = body.title || columns[index].title;
		await writeRepo(COL_REPO, columns);
		return Column.toResponse(columns[index]);
	}
	return null;
};

const deleteColumn = async id => {
	const columns = await readRepo(COL_REPO);
	const index = columns.findIndex(el => el.id === id);
	if (index !== -1) {
		columns.splice(index, 1);
		await writeRepo(COL_REPO, columns);
		return true;
	} else return false;
};

const clearAllTasks = async taskId => {
	const columns = await readRepo(TASKS_REPO);
	columns.forEach(col => {
		const tasks = col.tasks.filter(task => task !== taskId);
		col.tasks = [...tasks];
	});
	await writeRepo(COL_REPO, columns);
};

const getAllTasks = async () => readRepo(TASKS_REPO);

const getTask = async id => {
	const tasks = await readRepo(TASKS_REPO);
	const current = tasks.find(el => el.id === id);
	return Task.toResponse(current);
};

const createTask = async body => {
	const tasks = await readRepo(TASKS_REPO);
	const columnTasks = await tasks
		.filter(task => task.columnId === body.columnId)
		.sort((a, b) => a.order - b.order);
	columnTasks.unshift(new Task(body));
	const newTasks = [
		...tasks.filter(task => task.columnId !== body.columnId),
		...columnTasks.map((task, i) => ({ ...task, order: i })),
	];
	await writeRepo(TASKS_REPO, newTasks);
	return Task.toResponse(columnTasks[0]);
};

const updateTask = async (id, body) => {
	const tasks = await readRepo(TASKS_REPO);
	try {
		const updatedTasks = tasksHandler(id, body, tasks);
		await writeRepo(TASKS_REPO, updatedTasks);
		return Task.toResponse(updatedTasks.find(task => task.id === id));
	} catch {
		return null;
	}
};

const deleteTask = async id => {
	const tasks = await readRepo(TASKS_REPO);
	const index = tasks.findIndex(el => el.id === id);
	if (index !== -1) {
		tasks.splice(index, 1);
		await writeRepo(TASKS_REPO, tasks);
		return true;
	} else return false;
};

const deleteAllTasks = async columnId => {
	const tasks = await readRepo(TASKS_REPO).filter(
		el => el.columnId !== columnId
	);
	await writeRepo(TASKS_REPO, tasks);
};

module.exports = {
	getAllColumns,
	createColumn,
	getColumn,
	getTasksByColumn,
	updateColumn,
	deleteColumn,
	clearAllTasks,
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
	deleteAllTasks,
};
