var _GS = _GS || {};
_GS.playScene = function (canvasObj, contextObj) {
    var characters = [];

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

    this.renderScene = function () {};
    this.updateScene = function () {
    	console.log("UPDATE PLAY SCENE!");
    };
    this.handleInputScene = function () {};
};

// This will be a 2D array retrieved from the server.
_GS.playScene.divisionToRender = [];

// This will be an array of object (where each object represents a player).
_GS.players = [];

// Declare socket listeners.
SOCKET.on('update players', function (msg) {
    _GS.players = msg.players;    
});
