module.exports = class Column {
  constructor(name, tasks = []) {
    this.name = name;
    this.id = `COL${Date.now()}`;
    this.tasks = [...tasks];
  }

  static toResponse(columns) {
    const {
      name, id, tasks
    } = columns;
    return {
      name, id, tasks
    };
  }
}