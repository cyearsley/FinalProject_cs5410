var leaveAllRooms = require('./../../util/server.leaveAllRooms.js');
var getAllPlayers = require('./../../util/server.getAllPlayers.js');

module.exports = function (data, socket, io) {
	var rooms = io.nsps['/the_game'].adapter.rooms;
	var lobbyNameSpaces = ['lobby', 'options'];

	// if the user hasn't supplied input
	if (data.rname === '') {
		socket.emit('give feedback', {
			title: '<span style="color:red;">ERROR</span>',
			openThenClose_p: true,
			msg: '<h2>You must specify a name of a world to join!</h2><br /><br /><p>Your input cannot be empty</p>'
		});

		return false;
	}

	// if the user tries to join one of the default rooms.
	else if (lobbyNameSpaces.indexOf(data.rname) !== -1) {
		socket.emit('give feedback', {
			title: '<span style="color:red;">ERROR</span>',
			openThenClose_p: true,
			msg: '<h2>That is not a valid entry!</h2>'
		});

		return false;
	}

	// if the user tries to join a room it's already a part of.
	else if (typeof io.nsps['/the_game'].adapter.rooms[data.rname] !== 'undefined' && io.nsps['/the_game'].adapter.rooms[data.rname].sockets[socket.id] === true) {
		socket.emit('give feedback', {
			title: '<span style="color:red;">ERROR</span>',
			openThenClose_p: true,
			msg: '<h2>You are already a member of this world!</h2>'
		});

		return false;
	}

	// if the user tries to join a valid room... let them join!
	else if (typeof rooms[data.rname] !== 'undefined') {
		leaveAllRooms(socket, io);
		socket.join(data.rname);

		let newWorld = io.nsps['/the_game'].adapter.rooms[data.rname].world;
		
		// assign the players starting x/y positions.
		// set the player's x position in the middle of the map.
		socket.positionX = Math.floor(newWorld.struct[0].length/2)

		// find the highest point that is not empty, and set that as the player's y position.
		for (let ii = 0; ii < newWorld.struct.length; ii += 1) {
			if (newWorld.struct[ii][socket.positionX].blockType !== 'empty') {
				socket.positionY = ii - 2;
				break;
			}
		}

		// assign the actual x/y positions
		socket.actualY = socket.positionY*newWorld.blockWH;
		socket.actualX = socket.positionX*newWorld.blockWH;

		socket.emit('change scene', {newScene: 'play'});

		return true;
	}

	// if the user tries to join a room that does not exist.
	else {
		socket.emit('give feedback', {
			title: '<span style="color:red;">WARNING</span>',
			openThenClose_p: true,
			msg: '<h2>We could not find a world with the name: <span style="color: green">"' + data.rname + '"</span></h2><br /><br /><p>Please use a name from the list provided.</p>'
		});

		return false;
	}
}