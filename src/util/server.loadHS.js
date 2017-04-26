var fs = require('fs');
var highscoresFile = __dirname + '/../../highscores.txt';

module.exports = function () {
	return JSON.parse(fs.readFileSync(highscoresFile, "utf8"));
};
