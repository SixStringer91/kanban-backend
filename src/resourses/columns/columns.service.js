const db = require('../../repository/repository');

const getAll = async () => db.getAllColumns();
const create = async body => db.createColumn(body);
const getOne = async id => db.getColumn(id);
const getTasks = async id => db.getTasksByColumn(id);
const update = async (id, payload) => db.updateColumn(id, payload);
const deleteOne = async id => db.deleteColumn(id);

module.exports = {
  getAll,
  create,
  getOne,
  getTasks,
  update,
  deleteOne
};
