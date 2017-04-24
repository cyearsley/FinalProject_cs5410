var fs = require('fs');
var highscoresFile = __dirname + '\\..\\..\\highscores.txt';
var readHS = require('./server.loadHS.js');

module.exports = function (socket) {
	if (typeof socket.score !== 'undefined') {
		let highscoresNew = readHS();
		let userScore = {};

		if (typeof socket.username !== 'undefined') {
			userScore[socket.username] = socket.score;
		}
		else {
			userScore[socket.id] = socket.score;
		}

		Object.assign(highscoresNew, userScore);

		fs.writeFile(highscoresFile, JSON.stringify(highscoresNew), {"encoding":'utf8'}, function (err) {
			if (err !== null) {
				console.log("THERE WAS AN ERROR: ", err);
			}
		});
	}
};
