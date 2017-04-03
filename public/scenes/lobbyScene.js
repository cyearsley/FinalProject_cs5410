var _GS = _GS || {};
_GS.lobbyScene = function (canvasObj, contextObj) {
    var characters = [];
    _GS.lobbyScene.sceneActive_p = true;
    console.log("lobby!!!")
    SOCKET.emit('create room', {rname: 'lobby'});

    this.renderScene = function () {};
    this.updateScene = function () {};
    this.handleInputScene = function () {};
};

SOCKET.on('show rooms', function (data) {
	console.log("showing rooms", data)
	if (typeof _GS.lobbyScene !== 'undefined' && _GS.lobbyScene.sceneActive_p === true) {
		for (let ii = 0; ii < data.rooms.length; ii += 1) {
			console.log("ROOM: ", data.rooms[ii]);
		}
	}
});
