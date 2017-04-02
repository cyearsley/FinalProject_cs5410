var uuid = require('uuid');

module.exports = function (io) {
	io.of('/the_game').on('connection', function (socket) {
		console.log("User " + socket.id + " connected!");

		// Join an existing session
		socket.on('join room', function (data) {
			var rooms = io.nsps['/the_game'].adapter.rooms;

			if (typeof rooms[data.rname] !== 'undefined') {
				leaveAllRooms();
				socket.join(data.rname);
				emitPublicMessage('show rooms', {rooms: getAllRooms()});
			}
		});

		// Create an existing session
		socket.on('create room', function (data) {
			var rooms = io.nsps['/the_game'].adapter.rooms;
			if (typeof rooms[data.rname] === 'undefined' && data.rname.indexOf('/') === -1) {
				leaveAllRooms();
				socket.join(data.rname);

				// To assign a custom attr to the room, do something like the following:
					// io.nsps['/the_game'].adapter.rooms[data.rname].world = {struct: [[1,2,3],[4,5,6],[7,8,9]]};
					
				emitPublicMessage('show rooms', {rooms: getAllRooms()});
			}
		});

		// get all available rooms
		socket.on('get rooms', function () {
			emitPublicMessage('show rooms', {rooms: getAllRooms()});
		});

		// If a user disconnects from the room.
		socket.on('disconnect', function () {
			console.log("User " + socket.id + " DISCONNECTED!");
		});

		// Force this socket to leave all rooms.
		function leaveAllRooms () {
			var rooms = io.nsps['/the_game'].adapter.rooms;

			for (key in rooms) {
				socket.leave(key);
			}			
		}

		// emit a message to everyone in the '/the_game' namespace.
		function emitPublicMessage(name, msg) {
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
