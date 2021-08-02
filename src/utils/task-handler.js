const inAnotherColumnHandler = (index, body, tasks) => {
	const prevColId = tasks[index].columnId;
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
};

const inSameColumnHandler = (index, body, tasks) => {
	const updated = { ...tasks[index], ...body };
	tasks.splice(index, 1);
	const newColumnTasks = tasks
		.filter(task => task.columnId === body.columnId)
		.sort((a, b) => a.order - b.order);
	newColumnTasks.splice(+body.order, 0, updated);
	return [
		...tasks.filter(task => task.columnId !== body.columnId),
		...newColumnTasks.map((task, i) => ({ ...task, order: i })),
	];
};

const tasksHandler = (id, body, tasks) => {
	const currentIndex = tasks.findIndex(task => task.id === id);
	const prevColId = tasks[currentIndex].columnId;
	return prevColId === body.columnId
		? inSameColumnHandler(currentIndex, body, tasks)
		: inAnotherColumnHandler(currentIndex, body, tasks);
};

module.exports = tasksHandler;
