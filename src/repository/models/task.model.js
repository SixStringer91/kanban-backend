module.exports = class Task {
  constructor({
    title = 'some task',
    description = 'description',
    assignee = [],
    columnId
  }) {
    this.title = title;
    this.publishDate = Date.now();
    this.id = `TASK${this.publishDate}`;
    this.description = description;
    this.assignee = assignee;
    this.columnId = columnId;
    this.order = 0;
  }

  static toResponse(task) {
    const {
      title,
      id,
      publishDate,
      description,
      assignee,
      order,
      columnId
    } = task;
    return {
      title,
      id,
      publishDate,
      description,
      assignee,
      order,
      columnId
    };
  }
};
