var leaveAllRooms = require('./../../util/server.leaveAllRooms.js');
var createWorldArray = require('./../../util/server.createWorldArray.js');
var getAllPlayers = require('./../../util/server.getAllPlayers.js');

// returns true if a user successfully creates a room that isn't a default room.
module.exports = function (data, socket, io) {
	var rooms = io.nsps['/the_game'].adapter.rooms;
	var lobbyNameSpaces = ['lobby', 'options'];

	if (data.rname.indexOf('/') === -1) {

		// if the user tries to create a valid, non-existing room... let them!
		if (typeof rooms[data.rname] === 'undefined' && lobbyNameSpaces.indexOf(data.rname) === -1) {
			leaveAllRooms(socket, io);
			socket.join(data.rname);


			socket.emit('give feedback', {
				title: 'Creating a new world with the name: <span style="color:red;">' + data.rname + '</span>',
				open_p: true,
				msg: '<h2>Generating a new world just for you!</h2><br /><br /><p>This should only take a second...</p>'
			});

			// Where blockWH is the actual width/height of a block.
			io.nsps['/the_game'].adapter.rooms[data.rname].world = {struct: createWorldArray(), blockWH: 30};

			io.nsps['/the_game'].adapter.rooms[data.rname].updateState = function () {
				// socket.actualX += 1;
				// socket.positionX = Math.floor(socket.actualX/30)
				// socket.actualY += 1;
				// socket.positionY = Math.floor(socket.actualY/30)

				// Loop through each socket in the room, and update them if needed...
				let thisRoom = io.nsps['/the_game'].adapter.rooms[data.rname];
				let playerSockets = thisRoom.sockets;
				let players = [];
				let movingIncr = 3;
				let world = io.nsps['/the_game'].adapter.rooms[data.rname].world.struct;


				for (key in playerSockets) {
					players.push(io.nsps['/the_game'].sockets[key]);
					players[players.length - 1].socket = key;
				}

				// For each player in a given room, update their position!
				for (let ii = 0; ii < players.length; ii += 1) {
					let leftActualX = io.nsps['/the_game'].sockets[players[ii].socket].actualX;
					let rightActualX = io.nsps['/the_game'].sockets[players[ii].socket].actualX + 30;
					let topActualY = io.nsps['/the_game'].sockets[players[ii].socket].actualY;
					let bottomActualY = io.nsps['/the_game'].sockets[players[ii].socket].actualY + 60;
					if (players[ii].move_left === true) {
						if (world[Math.floor(topActualY/30)][Math.floor(leftActualX/30)].blockType === 'empty' && world[Math.floor((topActualY + 20)/30) + 1][Math.floor(leftActualX/30)].blockType === 'empty') {
							if (io.nsps['/the_game'].sockets[players[ii].socket].accLeft <= 10) {
								io.nsps['/the_game'].sockets[players[ii].socket].accLeft += 0.05;
							}
							io.nsps['/the_game'].sockets[players[ii].socket].actualX -= movingIncr + Math.floor(io.nsps['/the_game'].sockets[players[ii].socket].accLeft);
							io.nsps['/the_game'].sockets[players[ii].socket].positionX = Math.floor(io.nsps['/the_game'].sockets[players[ii].socket].actualX/30);
						}
						else {
							io.nsps['/the_game'].sockets[players[ii].socket].accLeft = 0;
						}
					}
					else {
						io.nsps['/the_game'].sockets[players[ii].socket].accLeft = 0;
					}

					if (players[ii].move_right === true) {
						if (world[Math.floor(topActualY/30)][Math.floor(rightActualX/30)].blockType === 'empty' && world[Math.floor((topActualY + 20)/30) + 1][Math.floor(rightActualX/30)].blockType === 'empty') {
							if (io.nsps['/the_game'].sockets[players[ii].socket].accRight <= 10) {
								io.nsps['/the_game'].sockets[players[ii].socket].accRight += 0.05;
							}
							io.nsps['/the_game'].sockets[players[ii].socket].actualX += movingIncr + Math.floor(io.nsps['/the_game'].sockets[players[ii].socket].accRight);
							io.nsps['/the_game'].sockets[players[ii].socket].positionX = Math.floor(io.nsps['/the_game'].sockets[players[ii].socket].actualX/30);
						}
						else {
							io.nsps['/the_game'].sockets[players[ii].socket].accRight = 0;
						}
					}
					else {
						io.nsps['/the_game'].sockets[players[ii].socket].accRight = 0;
					}
					if (players[ii].move_up === true) {
						io.nsps['/the_game'].sockets[players[ii].socket].actualY -= movingIncr;
						io.nsps['/the_game'].sockets[players[ii].socket].positionY = Math.floor(io.nsps['/the_game'].sockets[players[ii].socket].actualY/30);
					}

					if (players[ii].move_down === true && players[ii].move_up !== true) {
						if (world[Math.floor(bottomActualY/30)][Math.floor((leftActualX+5)/30)].blockType === 'empty' && world[Math.floor(bottomActualY/30)][Math.floor((rightActualX-5)/30)].blockType === 'empty') {
							if (io.nsps['/the_game'].sockets[players[ii].socket].accDown <= 7) {
								io.nsps['/the_game'].sockets[players[ii].socket].accDown += 0.2;
							}
							io.nsps['/the_game'].sockets[players[ii].socket].actualY += movingIncr + Math.floor(io.nsps['/the_game'].sockets[players[ii].socket].accDown);
							io.nsps['/the_game'].sockets[players[ii].socket].positionY = Math.floor(io.nsps['/the_game'].sockets[players[ii].socket].actualY/30);
						}
						else {
							io.nsps['/the_game'].sockets[players[ii].socket].accDown = 0;
						}
					}
					else {
						io.nsps['/the_game'].sockets[players[ii].socket].accDown = 0;
					}

				// notify current, and other players of changes.
				let msg = {players: []};
				msg.players = getAllPlayers(socket, io, data.rname);
				socket.emit('update players', msg);
				socket.to(data.rname).emit('update players', msg);
				}
			};

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

			socket.emit('give feedback', {open_p: false});

			socket.emit('change scene', {newScene: 'play'});

			return true;
		}

		// if a user tries to create a room that already exists...
		else if (typeof rooms[data.rname] !== 'undefined' && lobbyNameSpaces.indexOf(data.rname) === -1) {
			socket.emit('give feedback', {
				title: '<span style="color:red;">ERROR</span>',
				openThenClose_p: true,
				msg: '<h2>There already exists a world with that name!</h2><br /><br /><p>Either join this world, or create another world with a different name.</p>'
			});

			return false;
		}

		// if a user tries to create/join a default room...
		else if (lobbyNameSpaces.indexOf(data.rname) !== -1) {
			if (typeof io.nsps['/the_game'].adapter.rooms.lobby === 'undefined' || io.nsps['/the_game'].adapter.rooms.lobby.sockets[socket.id] !== true) {
				// socket.emit('give feedback', {msg: 'JOINING LOBBY', openThenClose_p: true});
				leaveAllRooms(socket, io);
				socket.join(data.rname);

				// socket.emit('change scene', {newScene: 'lobby'});
			}

			return false;
		}

	}

	// if there is some other error in the room's declared name.
	else {
		socket.emit('give feedback', {
			title: '<span style="color:red;">ERROR</span>',
			openThenClose_p: true,
			msg: '<h2>Something was wrong with your world\'s name!</h2><br /><br /><p>Be sure the world\'s name doesn\'t include "/"</p>'
		});

		return false;
	}
};