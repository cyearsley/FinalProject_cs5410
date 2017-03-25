console.log("Starting Application...");

var express = require('express');
var app = express();
var port = 8000;

app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function (req, res) {
	console.log("on home page");
});

app.get('/play', function (req, res) {
	console.log("on play page");
});

app.listen(port, function (err) {
	console.log("Running server on port: ", port);
});
