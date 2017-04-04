var uuid = require('uuid');
var createRoom = require('./methods/createRoom.js');
var joinRoom = require('./methods/joinRoom.js');

module.exports = function (io) {
	io.of('/the_game').on('connection', function (socket) {
		console.log("User " + socket.id + " connected!");

		// Join an existing session
		socket.on('join room', function (data) {
			joinRoom(data, socket, io);
			emitPublicMessage('show rooms', {rooms: getAllRooms()});
		});

		// Create an existing session
		socket.on('create room', function (data) {
			createRoom(data, socket, io);
			emitPublicMessage('show rooms', {rooms: getAllRooms()});
		});

		// get all available rooms
		socket.on('get rooms', function () {
			emitPublicMessage('show rooms', {rooms: getAllRooms()});
		});

		// get a rooms sub world

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
}
