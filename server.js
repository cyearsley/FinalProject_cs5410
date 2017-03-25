console.log("Starting Application...");

var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var port = 8000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));
app.set('views', './src/views');

var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
	console.log("on home page");
	res.render('index', {title: 'TerraiCraft!', durpList: ['ichi','ni','san']});
});

app.get('/play', function (req, res) {
	console.log("on play page");
});

app.post('/testing', function (req, res) {
	console.log("REQ: ", req.body);
	res.send({"error": 0}); 
});

// app.route('/testing')
// 	.post(function (req, res) {
// 		console.log("req: ", req.body);
// 		res.send({"error": 0}); 
// 	});

app.listen(port, function (err) {
	console.log("Running server on port: ", port);
});
