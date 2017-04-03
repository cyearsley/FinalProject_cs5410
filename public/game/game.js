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