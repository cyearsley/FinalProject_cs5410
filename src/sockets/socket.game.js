var uuid = require('uuid');
var createRoom = require('./methods/socket.createRoom.js');
var joinRoom = require('./methods/socket.joinRoom.js');
var leaveAllRooms = require('./../util/server.leaveAllRooms.js');
var getRenderedDivision = require('./../util/server.getRenderedDivision.js');
var getMyRoom = require('./../util/server.getMyRoom.js');

module.exports = function (io) {
	io.of('/the_game').on('connection', function (socket) {
		console.log("User " + socket.id + " connected!");

		// Join an existing session
		socket.on('join room', function (data) {
			if (joinRoom(data, socket, io)) {
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

		socket.on('get rendered division', function (msg) {
			console.log("GET MY ROOM: ", getRenderedDivision(socket.positionX, socket.positionY, +msg.blockWH, getMyRoom(socket, io).world.struct))
			socket.emit('update rendered division', getRenderedDivision(socket.positionX, socket.positionY, +getMyRoom(socket, io).world.blockWH, getMyRoom(socket, io).world.struct));
		});

		// If a user disconnects from the room.
		socket.on('disconnect', function () {
			console.log("User " + socket.id + " DISCONNECTED!");
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

	console.log(io.nsps['/the_game'].adapter.rooms)
	setInterval( function () {
		for (key in io.nsps['/the_game'].adapter.rooms) {
			if (key.indexOf('/') === -1 && typeof io.nsps['/the_game'].adapter.rooms[key].updateState !== 'undefined') {
				io.nsps['/the_game'].adapter.rooms[key].updateState();
			}
		}
	}, 1000/60);
}
