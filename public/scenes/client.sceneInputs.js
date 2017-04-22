console.log("scene inputs");

window.addEventListener('keydown', function (evt) {
	// console.log("KEY DOWN: ", evt.key);
	if (typeof sceneInputs[evt.key] !== 'undefined') {
		if (sceneInputs[evt.key].pressed === false) {
			if (GAMELOOP.getCurrentScene() === 'play') {
				SOCKET.emit('keydown', {action: sceneInputs[evt.key].action, active: true});
			}
		}
		sceneInputs[evt.key].pressed = true;
	}
});

window.addEventListener('keyup', function (evt) {
	// console.log("KEY UP: ", evt.key);
	if (typeof sceneInputs[evt.key] !== 'undefined') {
		if (sceneInputs[evt.key].pressed === true) {
			if (GAMELOOP.getCurrentScene() === 'play') {
				SOCKET.emit('keyup', {action: sceneInputs[evt.key].action, active: false});
			}
		}
		sceneInputs[evt.key].pressed = false;
	}
});


$(function () {
	$('#game-canvas')[0].addEventListener('mousemove', function (evt) {
		sceneInputs.mousePosition.x = evt.layerX;
		sceneInputs.mousePosition.y = evt.layerY;
	});
	$('#game-canvas').on('click', function (evt) {
		console.log("The click event is: ", evt);
		sceneInputs.hasClicked_p = true;
	});
	$('#game-canvas')[0].addEventListener('mouseup', function (evt) {
		if (GAMELOOP.getCurrentScene() === 'play') {
			let event = null;
			if (evt.button === 0) {
				event = 'left';
			}
			else if (evt.button === 1) {
				event = 'middle';
			}
			else if (evt.button === 2) {
				event = 'right';
			}
			let msg = {
				canvasX: evt.layerX,
				canvasY: evt.layerY,
				button: event,
				type: evt.type,
				canvasWidth: this.width,
				canvasHeight: this.height
			};
			if (event !== null) {
				SOCKET.emit('mouse up', msg);
			}
		}
	});
});

var sceneInputs = {
	'a': {
		'pressed': false,
		// 'updated': true,
		'action': 'move left'
	},
	's': {
		'pressed': false,
		// 'updated': true,
		'action': 'move down'

	},
	'd': {
		'pressed': false,
		// 'updated': true,
		'action': 'move right'

	},
	'w': {
		'pressed': false,
		// 'updated': true,
		'action': 'move up'
	},
	mousePosition: {
		x: null,
		y: null
	},
	hasClicked_p: false
};