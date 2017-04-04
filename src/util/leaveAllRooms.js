module.exports = function (socket, io) {
	var rooms = io.nsps['/the_game'].adapter.rooms;

	for (key in rooms) {
		socket.leave(key);
	}			
}