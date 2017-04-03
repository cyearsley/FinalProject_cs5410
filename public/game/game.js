// Create a connection to /the_game web socket
SOCKET = io.connect('/the_game');

SOCKET.on('give feedback', function (data) {
	if (data.open_p) {
		var newData = {
			title: 'NOTICE',
			msg: 'YOU NEED TO SPECIFCY a MESSAGE'
		};
		Object.assign(newData, data);
		$('#message-modal-title').html(newData.title);
		$('#message-modal-body').html(newData.msg);
		$('#message-modal').modal('show');
	}
	else {
		setTimeout(function () {
			$('#message-modal').modal('hide');
		}, 1000);
	}
});

var GameLoop = function () {

    var sceneControl = new MasterScene();
    this.init = function () {
    	console.log("socket: ", SOCKET)
        window.requestAnimationFrame(_gameLoop);
    };

    function _gameLoop (timestamp) {
        _update(timestamp);
        // sceneControl.handleInput();
        _render();

        window.requestAnimationFrame(_gameLoop);
    }

    function _update (timestamp) {
        sceneControl.update(timestamp);
    }

    function _render () {
        sceneControl.render();
    };
};
