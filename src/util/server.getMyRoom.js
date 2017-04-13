module.exports = function (socket, io) {
	return io.nsps['/the_game'].adapter.rooms[Object.keys(socket.rooms)[0]];
}