const express = require('express');

const router = express.Router({ mergeParams: true });

router.route('/').get((req, res) => {
	console.log(req);
	res.send('tasks get all');
});

router.route('/:taskId').get((req, res) => {
	console.log(req);
	res.send('tasks get one');
});

router.route('/').post((req, res) => {
	console.log(req);
	res.send('tasks add');
});

router.route('/:taskId').put((req, res) => {
	console.log(req);
	res.send('tasks update');
});

router.route('/:taskId').delete((req, res) => {
	console.log(req);
	res.send('tasks delete');
});

module.exports = router;
