var leaveAllRooms = require('./../../util/leaveAllRooms.js');
var createWorldArray = require('./../../util/createWorldArray.js');

module.exports = function (data, socket, io) {
	var rooms = io.nsps['/the_game'].adapter.rooms;
	var lobbyNameSpaces = ['lobby', 'options'];

	if (data.rname.indexOf('/') === -1) {

		if (typeof rooms[data.rname] === 'undefined' && lobbyNameSpaces.indexOf(data.rname) === -1) {
			leaveAllRooms(socket, io);
			socket.join(data.rname);

			socket.emit('give feedback', {
				title: 'Creating a new world with the name: <span style="color:red;">' + data.rname + '</span>',
				open_p: true,
				msg: '<h2>Generating a new world just for you!</h2><br /><br /><p>This should only take a second...</p>'
			});
			io.nsps['/the_game'].adapter.rooms[data.rname].world = {struct: createWorldArray()};
			socket.emit('give feedback', {open_p: false});

			socket.emit('change scene', {newScene: 'play'});
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
				leaveAllRooms(socket, io);
				socket.join(data.rname);

				socket.emit('change scene', {newScene: 'lobby'});
			}
		}

		// emitPublicMessage('show rooms', {rooms: getAllRooms()});
	}
	else {
		socket.emit('give feedback', {
			title: '<span style="color:red;">ERROR</span>',
			openThenClose_p: true,
			msg: '<h2>Something was wrong with your world\'s name!</h2><br /><br /><p>Be sure the world\'s name doesn\'t include "/"</p>'
		});
	}
};