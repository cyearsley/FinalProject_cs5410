var _GS = _GS || {};
_GS.lobbyScene = function (canvasObj, contextObj) {
    var characters = [
    	new tbCharacter({
    		text: 'Exit To Main',
    		fontSize: 50,
    		shadow: true,
    		x: 645,
    		y: 600,
    		sound: 'back',
    		onclick: function () {
    			SOCKET.emit('request scene change', {newScene: 'main'});
			    $('.lobby-input').prop('hidden', true);
			    $('.lobby-button').prop('hidden', true);
    		}
    	})
    ];
    var canvasWidth = canvasObj.canvas_game.width;
    var canvasHeight = canvasObj.canvas_game.height;
    var windowWidth = canvasWidth*0.25;
    var windowHeight = canvasHeight*0.75;
    SOCKET.emit('get rooms');
    SOCKET.emit('get lobby players');
    // var roomsList = [];

    var joinWindowStart = {x: canvasWidth - 50 - windowWidth, y: 25};

    _GS.lobbyScene.sceneActive_p = true;
    console.log("in the lobby!!!")

    // Make the UI visible
    $('.lobby-input').prop('hidden', false);
    $('.lobby-button').prop('hidden', false);

    let degrees = 0.01;
    let degreeIncr = 0;
    let increaseDegree = true;

    this.renderScene = function (context, canvasWidth, canvasHeight) {
    	contextObj.context_game.save();

    	let xPos = 10;
    	let yPos = 30;

    	context.translate(xPos + _GS.mainScene.images.logo.width / 2, yPos + _GS.mainScene.images.logo.height / 2);
		context.rotate(Math.PI*180+degrees);
		context.translate(-(xPos + _GS.mainScene.images.logo.width / 2), -(yPos + _GS.mainScene.images.logo.height / 2));
		// context.translate(-(position.x + dimensions.wh / 2), -(position.y + dimensions.wh / 2));
		context.globalAlpha = 0.2;
    	context.drawImage(_GS.mainScene.images.logo, xPos, yPos);
    	context.globalAlpha = 1.0;
    	context.restore();
		
		contextObj.context_game.fillStyle = '#000';
		contextObj.context_game.fillRect(joinWindowStart.x, joinWindowStart.y, windowWidth, windowHeight);

		contextObj.context_game.fillStyle = '#353535';
		context.font='90px Boogaloo';
		contextObj.context_game.fillText('Multiplayer', 100, 175);

		contextObj.context_game.fillStyle = '#252525';
		context.font='40px Boogaloo';
		contextObj.context_game.fillText('Players Currently In Lobby:', 50, 325);

		context.font='30px Boogaloo';
		let playerObj = {};
		for (let ii = 0; ii < _GS.lobbyScene.players.length; ii += 1) {
			playerObj[_GS.lobbyScene.players[ii]] = playerObj[_GS.lobbyScene.players[ii]] + 1 || 1;

			if (JSON.parse(localStorage.cyUserName).userName === _GS.lobbyScene.players[ii]) {
				contextObj.context_game.fillStyle = 'red';
			}
			else {
				contextObj.context_game.fillStyle = '#555555';
			}

			if (playerObj[_GS.lobbyScene.players[ii]] >= 2) {
				contextObj.context_game.fillText('╟' + _GS.lobbyScene.players[ii] + ' (instance ['+playerObj[_GS.lobbyScene.players[ii]]+'])', 65, 375+ii*30);
			}
			else {
				contextObj.context_game.fillText('╟' + _GS.lobbyScene.players[ii], 65, 375+ii*30);	
			}
		}

		contextObj.context_game.font = "35px Verdana";
		contextObj.context_game.fillStyle = '#3399ff';
		contextObj.context_game.fillText(".-=> Worlds <=-.", joinWindowStart.x + 35/2, joinWindowStart.y + 35);
		contextObj.context_game.font = "30px Verdana";
		contextObj.context_game.fillStyle = 'white';


		let temp = _GS.lobbyScene.rooms[0];
		let index = _GS.lobbyScene.rooms.indexOf('lobby');
		_GS.lobbyScene.rooms[0] = 'lobby';
		_GS.lobbyScene.rooms[index] = temp;

		for (let ii = 0; ii < _GS.lobbyScene.rooms.length; ii += 1) {
			if (_GS.lobbyScene.rooms[ii] !== 'lobby') {
            	contextObj.context_game.fillText(_GS.lobbyScene.rooms[ii], joinWindowStart.x + 35/2, joinWindowStart.y + 50 + ii*35);
			}
		}

		for (key in characters) {
			characters[key].render(context, canvasWidth, canvasHeight);
		}
		
		

		// contextObj.context_game.strokeStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		// contextObj.context_game.strokeRect(47.5, 47.5, 105, 105);

		contextObj.context_game.restore();
    };
    this.updateScene = function () {
    	for (key in characters) {
			characters[key].update();
		}

		for (let ii = 0; ii < characters.length; ii += 1) {
			characters[ii].update();
		}
		if (increaseDegree === true) {
			if (degreeIncr <= 120) {
				degreeIncr += 1;
				degrees += degreeIncr*0.00001;
			}
			else {
				increaseDegree = false;
			}
		}
		else {
			if (degreeIncr >= -130) {
				degreeIncr -= 1.1;
				degrees += degreeIncr*0.000015;
			}
			else {
				increaseDegree = true;
			}
		}
    };
    this.handleInputScene = function () {};

};
_GS.lobbyScene.rooms = [];
_GS.lobbyScene.players = [];

// Declare socket listeners.
SOCKET.on('show rooms', function (data) {
	// console.log("showing rooms", data)
	if (typeof _GS.lobbyScene !== 'undefined' && _GS.lobbyScene.sceneActive_p === true) {
		_GS.lobbyScene.rooms = data.rooms;
		for (let ii = 0; ii < data.rooms.length; ii += 1) {
			// console.log("ROOM: ", data.rooms[ii]);
		}
	}
});

SOCKET.on('show lobby players', function (data) {
	_GS.lobbyScene.players = data.players;
});

// Declare DOM event listeners once... and only once...
$(function () {

	$('#create-submit-button').on('click', function (evt) {
		console.log("CREEEEATE");
		SOCKET.emit('create room', {rname: $('#create-input').val()});
		$('#create-input').val('');
	});

	$('#join-submit-button').on('click', function (evt) {
		console.log("JOOOOOOOIIIIIN");
		SOCKET.emit('join room', {rname: $('#join-input').val()});
		$('#join-input').val('');
	});
});
