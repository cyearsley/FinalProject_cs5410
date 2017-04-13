var _GS = _GS || {
    blockWH: 30
};
_GS.playScene = function (canvasObj, contextObj) {
    var characters = [];

    // SOCKET.emit('get world properties');
    SOCKET.emit('get rendered division', {blockWH: _GS.blockWH});

    // $('.lobby-input').prop('hidden', true);
    // $('.lobby-button').prop('hidden', true);

    this.init = function () {

    };

    // ====================================================================================================================== //
    //
    // R E N D E R - S C E N E
    //
    //  The formula to render, relative to the players position is:
    //      R_cx = -B_w - (P_x - W_[floor(P_x/b_w)][0].x)
    //                      AND
    //      R_cy = -B_h - (P_y - W_[floor(P_y/b_h)][0].y)
    //  Where:
    //      R_cx,R_cy = the render x,y starting coordinates.
    //      B_w,B_h = the width/height of the buffer between the render x,y start position and the canvas x,y start position.
    //      P_x,P_y = the players actual x,y positions.
    //      W_[][] = the subdivision of the entire world to be rendered.
    //      b_w,b_h = the width and height of a block.
    //
    //          Author: cnyearsley@gmail.com
    // ====================================================================================================================== //

    this.renderScene = function () {
        
    };
    this.updateScene = function () {
    	// console.log("UPDATE PLAY SCENE!");
    };
    this.handleInputScene = function () {

    };
};

// This will be a 2D array retrieved from the server.
_GS.playScene.divisionToRender = [];

// All players should have a socket id and an x/y position.

// This will be an array of objects (where each object represents a player).
_GS.players = [];

// An object that represents the current player.
_GS.currentPlayer = {};

// An object that stores block width/height and the buffer width/height
_GS.worldProperties = {};

// Declare socket listeners.
SOCKET.on('update players', function (msg) {

    // get the current player.
    for (key in msg.players) {
        if (+msg.players[key].socket_id === +SOCKET.id) {
            _GS.currentPlayer = msg.players[key];
        }
    }
    _GS.players = msg.players;
    console.log("PLAYERS: ", _GS.players[0].x);    
});

SOCKET.on('update rendered division', function (msg) {
    console.log("NEW rendered division: ", msg);
    _GS.playScene.divisionToRender = msg;
});

SOCKET.on('update world properties', function (msg) {
    _GS.worldProperties = msg.worldProperties;
    console.log("NEW world props: ", _GS.worldProperties);
});
