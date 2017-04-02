var express = require('express');
var path = require('path');
var gameRouter = express.Router();

module.exports = function () {
	gameRouter.route('/')
	.get(function (req, res) {
		res.sendFile(path.join(__dirname, '../views/play.html'));
	});

	return gameRouter;
};
