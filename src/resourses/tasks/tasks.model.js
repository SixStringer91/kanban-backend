module.exports = class Task {
	constructor({
		title = 'some task',
		description = 'description',
		assignee = ''
	}) {
		this.title = title;
		this.id = `TASK${Date.now()}`;
		this.publishDate = Date.now();
		this.description = description;
		this.assignee = assignee;
	}

	static toResponse(columns) {
		const {
      title,
      id, 
      publishDate,
      description,
      assignee
    } = columns;
		return {
			title,
			id,
			publishDate,
			description,
			assignee,
		};
	}
};
