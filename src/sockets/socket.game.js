var uuid = require('uuid');

var lobbyNameSpaces = ['lobby', 'options'];

function createWorldArray (size) {
	let width = 3000;
	let height = 1000;
	let worldArr = [];

	for (let ii = 0; ii < 1000; ii += 1) {
		worldArr.push([]);
		for (let jj = 0; jj < 3000; jj += 1) {
			if (ii < 250) {
				worldArr[ii].push({
					blockType: 'empty',
					blockIndex_y: ii,
					blockIndex_x: jj,
					hp: 0
				});
			}
			else if (ii < 251) {
				worldArr[ii].push({
					blockType: 'grass',
					blockIndex_y: ii,
					blockIndex_x: jj,
					hp: 10
				});
			}
			else if (ii < 275) {
				worldArr[ii].push({
					blockType: 'dirt',
					blockIndex_y: ii,
					blockIndex_x: jj,
					hp: 10
				});
			}
			else {
				worldArr[ii].push({
					blockType: 'stone',
					blockIndex_y: ii,
					blockIndex_x: jj,
					hp: 20
				});
			}
		}
	}
	return worldArr;
}

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
			if (data.createOrJoin === true) {
				if (typeof rooms[data.rname] === 'undefined' && data.rname.indexOf('/') === -1) {
					leaveAllRooms();
					socket.join(data.rname);

					if (lobbyNameSpaces.indexOf(data.rname) === -1) {
						io.nsps['/the_game'].adapter.rooms[data.rname].world = {struct: createWorldArray()};
						console.log("NEW ROOM: ", rooms)
					}

					emitPublicMessage('show rooms', {rooms: getAllRooms()});
				}
				else {
					if (typeof rooms[data.rname] !== 'undefined') {
						leaveAllRooms();
						socket.join(data.rname);
						emitPublicMessage('show rooms', {rooms: getAllRooms()});
					}
				}
			}
			else {
				if (typeof rooms[data.rname] === 'undefined' && data.rname.indexOf('/') === -1) {
					leaveAllRooms();
					socket.join(data.rname);

					console.log("Before World Creation");
					socket.emit('give feedback', {title:'BROOOO', msg: 'Your world is being generated!', open_p: true});
					io.nsps['/the_game'].adapter.rooms[data.rname].world = {struct: createWorldArray()};
					socket.emit('give feedback', {open_p: false})
					console.log("AFTER World Creation", io.nsps['/the_game'].adapter.rooms);

					// To assign a custom attr to the room, do something like the following:
						// io.nsps['/the_game'].adapter.rooms[data.rname].world = {struct: [[1,2,3],[4,5,6],[7,8,9]]};
						
					emitPublicMessage('show rooms', {rooms: getAllRooms()});
				}
			}
		});

		// get all available rooms
		socket.on('get rooms', function () {
			emitPublicMessage('show rooms', {rooms: getAllRooms()});
		});

		// If a user disconnects from the room.
		socket.on('disconnect', function () {
			console.log("User " + socket.id + " DISCONNECTED!");
			emitPublicMessage('show rooms', {rooms: getAllRooms()});
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
