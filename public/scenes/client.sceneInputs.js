console.log("scene inputs");

window.addEventListener('keydown', function (evt) {
	console.log("KEY DOWN: ", evt.key);
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
	console.log("KEY UP: ", evt.key);
	if (typeof sceneInputs[evt.key] !== 'undefined') {
		if (sceneInputs[evt.key].pressed === true) {
			if (GAMELOOP.getCurrentScene() === 'play') {
				SOCKET.emit('keyup', {action: sceneInputs[evt.key].action, active: false});
			}
		}
		sceneInputs[evt.key].pressed = false;
	}
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
	}

};