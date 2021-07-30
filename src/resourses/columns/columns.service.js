const { readFile, writeFile } = require('fs').promises;
const path = require('path');
const Model = require('./columns.model');
const COL_REPO = 'columns.repository.json';

const getAll = async () => {
	const columns = JSON.parse(
		await readFile(path.resolve(__dirname, '.', COL_REPO))
	);
	return columns;
};

const getColumn = async id => {
	const columns = JSON.parse(
		await readFile(path.resolve(__dirname, '.', COL_REPO))
	);
	const current = columns.find(el => el.id === id);
	console.log(current);
	return Model.toResponse(current);
};

const createColumn = async body => {
	const columns = JSON.parse(
		await readFile(path.resolve(__dirname, '.', COL_REPO))
	);
	const newColumn = new Model(body.title);
	columns.push(newColumn);
	await writeFile(
		path.resolve(__dirname, '.', COL_REPO),
		JSON.stringify(columns)
	);
	return Model.toResponse(newColumn);
};

const updateColumn = async (id, body) => {
	const columns = JSON.parse(
		await readFile(path.resolve(__dirname, '.', COL_REPO))
	);
	const index = columns.findIndex(el => el.id === id);
	if (index !== -1){
		сolumn[index].name = body.name;
		columns[index].tasks = [...body.tasks];
		await writeFile(
			path.resolve(__dirname, '.', COL_REPO),
			JSON.stringify(columns)
		);
		return Model.toResponse(columns[index]);
	}
	return null;
};

const deleteColumn = async id => {
	const columns = JSON.parse(
		await readFile(path.resolve(__dirname, '.', COL_REPO))
	);
  const index = columns.findIndex(el => el.id === id);
  if (index !== -1){
  columns.splice(index, 1);
	await writeFile(
		path.resolve(__dirname, '.', COL_REPO),
		JSON.stringify(columns)
	);
	return true;
} else return false
};

module.exports = { getAll, createColumn, getColumn, updateColumn, deleteColumn };
