var leaveAllRooms = require('./../../util/leaveAllRooms.js');

module.exports = function (data, socket, io) {
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
		leaveAllRooms(socket, io);
		socket.join(data.rname);
		// emitPublicMessage('show rooms', {rooms: getAllRooms()});
	}
	else {
		socket.emit('give feedback', {
			title: '<span style="color:red;">WARNING</span>',
			openThenClose_p: true,
			msg: '<h2>We could not find a world with the name: <span style="color: green">"' + data.rname + '"</span></h2><br /><br /><p>Please use a name from the list provided.</p>'
		});
	}
}