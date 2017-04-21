var uuid = require('uuid');
var createRoom = require('./methods/socket.createRoom.js');
var joinRoom = require('./methods/socket.joinRoom.js');
var leaveAllRooms = require('./../util/server.leaveAllRooms.js');
var getRenderedDivision = require('./../util/server.getRenderedDivision.js');
var getMyRoom = require('./../util/server.getMyRoom.js');

module.exports = function (io) {
	io.of('/the_game').on('connection', function (socket) {
		console.log("User " + socket.id + " connected!");
		socket.broadcast.emit('player (dis)connect', {playerName: socket.id, status: '<b style="color: green;">connected</b> to'});
		socket.move_left = false;
		socket.accLeft = 0;

		socket.move_right = false;
		socket.accRight = 0;

		socket.move_up = false;
		socket.accUp = 1;

		socket.move_down = true;
		socket.accDown = 0;

		socket.moveMax = 3;

		// socket.actionList = [];
		// socket.updateInterval = setInterval( function () {
		// 	console.log("INTERVAL");
		// 	if (socket.actionList.length >= 1) {

		// 	}
		// },1000);

		// Join an existing session
		socket.on('join room', function (data) {
			if (joinRoom(data, socket, io)) {
				let playerSockets = io.nsps['/the_game'].adapter.rooms[data.rname].sockets;
				let players = [];

				for (key in playerSockets) {
					players.push(io.nsps['/the_game'].sockets[key]);
				}

				console.log("PLAYERS: ", players);
				console.log("Joined room!");
				// console.log("THE IO: ", socket.rooms);
				// console.log("THE IO: ", io.nsps['/the_game'].connected[socket.id]);
			}
			emitPublicMessage('show rooms', {rooms: getAllRooms()});
		});

		// Create an existing session
		socket.on('create room', function (data) {
			if (createRoom(data, socket, io)) {
				console.log("Created room!");

				// console.log("Created room!", Object.keys(socket.rooms)[0]);

				// console.log("THE IO: ", socket.rooms);
				// console.log("THE IO: ", io.nsps['/the_game'].connected[socket.id]);
			}
			emitPublicMessage('show rooms', {rooms: getAllRooms()});
		});

		// get all available rooms
		socket.on('get rooms', function () {
			emitPublicMessage('show rooms', {rooms: getAllRooms()});
		});

		// client requesting world properties.
		socket.on('get world properties', function () {
			let world = io.nsps['/the_game'].adapter.rooms[Object.keys(socket.rooms)[0]].world;
			socket.emit('update world properties', {
				worldProperties: {
					blockWH: world.blockWH,
					worldName: Object.keys(socket.rooms)[0]
				}
			});
		});

		socket.on('keydown', function (msg) {
			if (msg.action === 'move left') {
				socket.move_left = true;
			}
			if (msg.action === 'move right') {
				socket.move_right = true;
			}
			if (msg.action === 'move up') {
				socket.move_up = true;
			}
			if (msg.action === 'move down') {
				socket.move_down = true;
			}
		});

		socket.on('keyup', function (msg) {
			if (msg.action === 'move left') {
				socket.move_left = false;
			}
			if (msg.action === 'move right') {
				socket.move_right = false;
			}
			if (msg.action === 'move up') {
				socket.move_up = false;
			}
			if (msg.action === 'move down') {
				socket.move_down = true;
			}
		});

		socket.on('mouse up', function (msg) {
			// user is trying to destroy a block...
			if (msg.button === 'left') {
				let xIndex = Math.floor((msg.canvasX - Math.floor(msg.canvasWidth/2) + socket.actualX)/30);
				let yIndex = Math.floor((msg.canvasY - Math.floor(msg.canvasHeight/2) + socket.actualY)/30);
				let roomName = Object.keys(socket.rooms)[0];
				io.nsps['/the_game'].adapter.rooms[roomName].world.struct[yIndex][xIndex].blockType = 'empty';
				socket.emit('notify world change'); 
				socket.to(roomName).emit('notify world change');
				// socket.emit('update rendered division', getRenderedDivision(socket.positionX, socket.positionY, +getMyRoom(socket, io).world.blockWH, getMyRoom(socket, io).world.struct));
				// socket.to(roomName).emit('update rendered division', getRenderedDivision(socket.positionX, socket.positionY, +getMyRoom(socket, io).world.blockWH, getMyRoom(socket, io).world.struct));
			}
		});

		socket.on('get rendered division', function (msg) {
			// console.log("GET MY ROOM: ", getRenderedDivision(socket.positionX, socket.positionY, +msg.blockWH, getMyRoom(socket, io).world.struct))
			// console.log("getting rendered division for: ", socket.id, socket.positionX, socket.positionY);
			socket.emit('update rendered division', getRenderedDivision(socket.positionX, socket.positionY, +getMyRoom(socket, io).world.blockWH, getMyRoom(socket, io).world.struct));
		});

		// If a user disconnects from the room.
		socket.on('disconnect', function () {
			console.log("User " + socket.id + " DISCONNECTED!");
			clearInterval(socket.updateInterval);
			socket.broadcast.emit('player (dis)connect', {playerName: socket.id, status: '<b style="color: red;">disconnected</b> from'});
			emitPublicMessage('show rooms', {rooms: getAllRooms()});
		});

		// emit a message to everyone in the '/the_game' namespace.
		function emitPublicMessage(name, msg) {
			console.log("======= Public Message: " + msg + " =======");
			socket.emit(name, msg);
			socket.broadcast.emit(name, msg);
		}

		// get a list of all rooms created
		function getAllRooms () {
			var rooms = [];
			var roomObj = io.nsps['/the_game'].adapter.rooms;
			for (key in roomObj) {
				if (key.indexOf('/') === -1) {
					rooms.push(key);
				}
			}

			return rooms;
		}
	});

	setInterval( function () {
		for (key in io.nsps['/the_game'].adapter.rooms) {
			if (key.indexOf('/') === -1 && typeof io.nsps['/the_game'].adapter.rooms[key].updateState !== 'undefined') {
				io.nsps['/the_game'].adapter.rooms[key].updateState(key);
			}
		}
	}, 1000/60);
}
