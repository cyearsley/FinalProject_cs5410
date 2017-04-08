var _GS = _GS || {};
_GS.lobbyScene = function (canvasObj, contextObj) {
    var characters = [];
    var canvasWidth = canvasObj.canvas_game.width;
    var canvasHeight = canvasObj.canvas_game.height;
    var windowWidth = canvasWidth*0.25;
    var windowHeight = canvasHeight*0.75;
    // var roomsList = [];

    var joinWindowStart = {x: canvasWidth - 50 - windowWidth, y: 25};

    _GS.lobbyScene.sceneActive_p = true;
    console.log("lobby!!!")
    // SOCKET.emit('create room', {rname: 'lobby', createOrJoin: true});

    // Make the UI visible
    $('.lobby-input').prop('hidden', false);
    $('.lobby-button').prop('hidden', false);


    this.renderScene = function () {
    	contextObj.context_game.save();
		
		contextObj.context_game.fillStyle = '#000';
		contextObj.context_game.fillRect(joinWindowStart.x, joinWindowStart.y, windowWidth, windowHeight);

		contextObj.context_game.font = "30px Verdana";
		contextObj.context_game.fillStyle = 'white';

		for (let ii = 0; ii < _GS.lobbyScene.rooms.length; ii += 1) {
            contextObj.context_game.fillText(_GS.lobbyScene.rooms[ii], joinWindowStart.x + 35/2, joinWindowStart.y + 35 + ii*35);
		}
		
		// contextObj.context_game.strokeStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		// contextObj.context_game.strokeRect(47.5, 47.5, 105, 105);

		contextObj.context_game.restore();
    };
    this.updateScene = function () {};
    this.handleInputScene = function () {};

};
_GS.lobbyScene.rooms = [];

$(function () {
	SOCKET.on('show rooms', function (data) {
		console.log("showing rooms", data)
		if (typeof _GS.lobbyScene !== 'undefined' && _GS.lobbyScene.sceneActive_p === true) {
			_GS.lobbyScene.rooms = data.rooms;
			for (let ii = 0; ii < data.rooms.length; ii += 1) {
				console.log("ROOM: ", data.rooms[ii]);
			}
		}
	});
	$('#create-submit-button').on('click', function (evt) {
		console.log("CREEEEATE");
		SOCKET.emit('create room', {rname: $('#create-input').val()});
		$('#create-input').val('');
	});

	$('#join-submit-button').on('click', function (evt) {
		SOCKET.emit('join room', {rname: $('#join-input').val()});
		$('#join-input').val('');
	});
});
