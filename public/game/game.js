// Create a connection to /the_game web socket
SOCKET = io.connect('/the_game');

SOCKET.on('give feedback', function (data) {
	console.log(data.msg);
	console.alert(data.msg);
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