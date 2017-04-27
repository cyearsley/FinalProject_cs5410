module.exports = function (socket, io, rname) {
	let socketsInRoom = [];
	let sockets = io.nsps['/the_game'].adapter.rooms[rname].sockets;
	let players = [];
	let socketObj = {};

	for (key in sockets) {
		socketsInRoom.push(key);
	}

	for (let ii = 0; ii < socketsInRoom.length; ii += 1) {
		socketObj = io.nsps['/the_game'].sockets[socketsInRoom[ii]];
		players.push({
			x: socketObj.positionX,
			y: socketObj.positionY,
			username: socketObj.username,
			actualX: socketObj.actualX,
			actualY: socketObj.actualY,
			isMoving: socketObj.isMoving,
			direction: socketObj.dir,
			socket_id: socketsInRoom[ii].split('#')[1]
		});
	}

	// console.log("IO: ", io.nsps['/the_game'])
	// console.log("PLAYERS: ", players);
	return players;
};