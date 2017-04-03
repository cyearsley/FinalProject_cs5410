var MasterScene = function () {

    // ======================================================= //
    //
    // C A N V A S - S P E C I F I C S
    //
    // ======================================================= //
    var canvasObj = {
        canvas_background: $('#background-canvas')[0],
        canvas_game: $('#game-canvas')[0]
    };

    var contextObj = {
        context_background: canvasObj.canvas_background.getContext('2d'),
        context_game: canvasObj.canvas_game.getContext('2d')
    };
    // console.log("canvas width: ", canvas.width);
    CanvasRenderingContext2D.prototype.clear = function() {
        this.save();
        this.setTransform(1, 0, 0, 1, 0, 0);
        this.clearRect(0, 0, canvasObj.canvas_background.width, canvasObj.canvas_background.height);
        this.restore();
    };
    this.init = function () {
        // context.clearRect(0, 0, canvas_background.width, canvas_background.height);
    };
    function beginRender () {
        // context_background.clear();
    };

    // ======================================================= //
    //
    // L O B B Y - S C E N E
    //
    // ======================================================= //
    // var lobbyScene = function () {
    //     var characters = [];
    //     this.init = function () {

    //     };
    //     this.renderScene = function () {};
    //     this.updateScene = function () {};
    //     this.handleInputScene = function () {};
    // };

    var scenes = {
        lobby: new _GS.lobbyScene(canvasObj, contextObj),
        currentScene: 'lobby'
    };

    SOCKET.on('change scene', function (msg) {
        
    });

    this.render = function () {
        // Render the scene, and all the characters in it.
        beginRender();
        // context.drawImage(backgroundImage,0,0,canvas.width,canvas.height);
        for (key in scenes) {
            if (scenes[key] && key != 'currentScene') {
                if (key === scenes.currentScene) {
                    scenes[key].renderScene();
                }
            }
        }
    };

    this.update = function (timestamp) {
        if (contextObj.context_background.globalAlpha < 1.1) {
            contextObj.context_background.globalAlpha += 0.025;
        }
        // Update the scene, and all the characters in it.
        for (key in scenes) {
            if (scenes[key] && key != 'currentScene') {
                if (key === scenes.currentScene) {
                    scenes[key].updateScene(timestamp);
                }
            }
        }
    };

    this.handleInput = function () {
        // Handle the input for the scene.
        for (key in scenes) {
            if (scenes[key] && key != 'currentScene') {
                if (key === scenes.currentScene) {
                    scenes[key].handleInputScene();
                }
            }
        }
    };
};
