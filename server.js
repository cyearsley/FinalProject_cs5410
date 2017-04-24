var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var highscoresFile = __dirname + '\\highscores.txt';

global.highScores = {};
fs.readFile(highscoresFile, "utf8", function (err, data) {
	global.highScores = JSON.parse(data);
});

var socket = require('socket.io');
var io = socket(http);

var PORT = process.env.PORT || 8000;

var gameRouter = require(path.join(__dirname, 'src/routes/route.game'))(socket, io);
var gameSocket = require(path.join(__dirname, 'src/sockets/socket.game'))(io)

app.use('/play', gameRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'src/views/index.html'));
});

http.listen(PORT, function () {
	console.log("listening on port: ", PORT);
});

// global.roomPs should have a structure of:
// {
// 	<roomname>: {
// 		players: {
// 			<player-socket-id>: {
// 				x: '',
// 				y: ''
// 			},
// 			<player-socket-id>: {
// 				x: '',
// 				y: ''
// 			}
// 		}
// 	}
// }
