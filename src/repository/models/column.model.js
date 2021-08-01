module.exports = class Column {
  constructor(
    {
    title, 
    tasks = []
    }) {
    this.title = title;
    this.id = `COL${Date.now()}`;
    this.tasks = [...tasks];
  }

  static toResponse(columns) {
    const {
      title, id, tasks
    } = columns;
    return {
      title, id, tasks
    };
  }
}