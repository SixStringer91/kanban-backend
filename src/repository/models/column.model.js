module.exports = class Column {
  constructor(
    {
    title, 
    color,
    tasks = []
    }) {
    if(!title || !color) throw new Error();
    this.title = title;
    this.color = color;
    this.id = `COL${Date.now()}`;
    this.tasks = [...tasks];
  }

  static toResponse(columns) {
    const {
      title, id, tasks, color
    } = columns;
    return {
      title, id, tasks, color
    };
  }
}