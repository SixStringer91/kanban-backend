const db = require('../../repository/repository');

const getAll = async () => db.getAllTasks();
const create = async body => db.createTask(body);
const getOne = async id => db.getTask(id);
const update = async (id, payload) => db.updateTask(id, payload);
const deleteOne = async id => db.deleteTask(id);
const deleteAll = async columnId => db.deleteAllTasks(columnId);
module.exports = {
	getAll,
	create,
	getOne,
	update,
	deleteOne,
	deleteAll,
};
