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

			if (data.rname === '') {
				socket.emit('give feedback', {
					title: '<span style="color:red;">ERROR</span>',
					openThenClose_p: true,
					msg: '<h2>You must specify a name of a world to join!</h2><br /><br /><p>Your input cannot be empty</p>'
				});
			}
			else if (typeof io.nsps['/the_game'].adapter.rooms[data.rname] !== 'undefined' && io.nsps['/the_game'].adapter.rooms[data.rname].sockets[socket.id] === true) {
				socket.emit('give feedback', {
					title: '<span style="color:red;">ERROR</span>',
					openThenClose_p: true,
					msg: '<h2>You are already a member of this world!</h2>'
				});
			}
			else if (typeof rooms[data.rname] !== 'undefined') {
				leaveAllRooms();
				socket.join(data.rname);
				emitPublicMessage('show rooms', {rooms: getAllRooms()});
			}
			else {
				socket.emit('give feedback', {
					title: '<span style="color:red;">WARNING</span>',
					openThenClose_p: true,
					msg: '<h2>We could not find a world with the name: <span style="color: green">"' + data.rname + '"</span></h2><br /><br /><p>Please use a name from the list provided.</p>'
				});
			}
		});

		// Create an existing session
		socket.on('create room', function (data) {
			var rooms = io.nsps['/the_game'].adapter.rooms;
			if (data.rname.indexOf('/') === -1) {

				if (typeof rooms[data.rname] === 'undefined' && lobbyNameSpaces.indexOf(data.rname) === -1) {
					leaveAllRooms();
					socket.join(data.rname);

					socket.emit('give feedback', {
						title: 'Creating a new world with the name: <span style="color:red;">' + data.rname + '</span>',
						open_p: true,
						msg: '<h2>Generating a new world just for you!</h2><br /><br /><p>This should only take a second...</p>'
					});
					io.nsps['/the_game'].adapter.rooms[data.rname].world = {struct: createWorldArray()};
					socket.emit('give feedback', {open_p: false});
				}
				else if (typeof rooms[data.rname] !== 'undefined' && lobbyNameSpaces.indexOf(data.rname) === -1) {
					socket.emit('give feedback', {
						title: '<span style="color:red;">ERROR</span>',
						openThenClose_p: true,
						msg: '<h2>There already exists a world with that name!</h2><br /><br /><p>Either join this world, or create another world with a different name.</p>'
					});
				}
				else if (lobbyNameSpaces.indexOf(data.rname) !== -1) {
					if (typeof io.nsps['/the_game'].adapter.rooms.lobby === 'undefined' || io.nsps['/the_game'].adapter.rooms.lobby.sockets[socket.id] !== true) {
						socket.emit('give feedback', {msg: 'JOINING LOBBY', openThenClose_p: true});
						leaveAllRooms();
						socket.join(data.rname);
					}
				}

				emitPublicMessage('show rooms', {rooms: getAllRooms()});
			}
			else {
				socket.emit('give feedback', {
					title: '<span style="color:red;">ERROR</span>',
					openThenClose_p: true,
					msg: '<h2>Something was wrong with your world\'s name!</h2><br /><br /><p>Be sure the world\'s name doesn\'t include "/"</p>'
				});
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
