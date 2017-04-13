var _GS = _GS || {};
_GS.playScene = function (canvasObj, contextObj) {
    var characters = [];

    $('.lobby-input').prop('hidden', true);
    $('.lobby-button').prop('hidden', true);

    // SOCKET.emit('get world properties');
    SOCKET.emit('get rendered division', {blockWH: _GS.playScene.blockWH});

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

    this.renderScene = function (context) {
        context.save();
        
        if (typeof _GS.playScene.divisionToRender !== 'undefined') {
            let divToRender = _GS.playScene.divisionToRender;
            let worldDiv = divToRender.subdivision;
            let bufferWidth = divToRender.bufferWidth/10;
            let bufferHeight = divToRender.bufferHeight/10;
            // let bufferWidth = 0;
            // let bufferHeight = 0;
            let actualX = _GS.playScene.currentPlayer.actualX;
            let actualY = _GS.playScene.currentPlayer.actualY;
            // console.log(worldDiv[0][0].blockIndex_x)
            let startingRenderX = bufferWidth - (actualX - worldDiv[Math.floor(actualX%_GS.playScene.blockWH)][0].blockIndex_x * _GS.playScene.blockWH);
            let startingRenderY = bufferHeight - (actualY - worldDiv[Math.floor(actualY%_GS.playScene.blockWH)][0].blockIndex_y * _GS.playScene.blockWH);
            // console.log("World div: ", startingRenderY);

            for (let ii = 0; ii < worldDiv.length; ii += 1) {
                for (let jj = 0; jj < worldDiv[0].length; jj += 1) {
                    // console.log("worldDiv[jj][ii].blockType: ", worldDiv[ii][jj].blockType);
                    if (worldDiv[ii][jj].blockType !== 'empty' && _GS.playScene.images[worldDiv[ii][jj].blockType].isReady_p) {
                        context.drawImage(_GS.playScene.images[worldDiv[ii][jj].blockType], startingRenderX + jj*30, startingRenderY + ii*30, 30, 30);
                    }
                }
            }

            context.beginPath();
            context.moveTo(0,0);
            context.lineTo(700,350);
            context.stroke();
        }
        // let startingRenderY = ;

        // if (_GS.playScene.images.grass.isReady_p) {
        //     context.drawImage(_GS.playScene.images.grass, 100, 100, 30, 30);
        // }

        context.restore();
    };
    this.updateScene = function () {
    	// console.log("UPDATE PLAY SCENE!");
    };
    this.handleInputScene = function () {

    };
};

_GS.playScene.blockWH = 30;

_GS.playScene.images = {
    grass: createImage('./../resources/world-tiles/Grass.PNG'),
    dirt: createImage('./../resources/world-tiles/Dirt.PNG'),
    stone: createImage('./../resources/world-tiles/Stone.PNG')
}

// This will be a 2D array retrieved from the server.
// _GS.playScene.divisionToRender = {};

// All players should have a socket id and an x/y position.

// This will be an array of objects (where each object represents a player).
_GS.playScene.players = [];

// An object that represents the current player.
_GS.playScene.currentPlayer = {};

// An object that stores block width/height and the buffer width/height
_GS.playScene.worldProperties = {};

// Declare socket listeners.
SOCKET.on('update players', function (msg) {

    // get the current player.
    for (key in msg.players) {
        // console.log("_GS.playScene.currentPlayer", msg.players[key].socket_id, SOCKET.id)
        if (msg.players[key].socket_id === SOCKET.id) {
            _GS.playScene.currentPlayer = msg.players[key];
        }
    }
    _GS.players = msg.players;
    // console.log("PLAYERS: ", _GS.players[0]);    
});

SOCKET.on('update rendered division', function (msg) {
    console.log("NEW rendered division: ", msg);
    _GS.playScene.divisionToRender = msg;
});

SOCKET.on('update world properties', function (msg) {
    _GS.worldProperties = msg.worldProperties;
    console.log("NEW world props: ", _GS.playScene.worldProperties);
});

function createImage (path) {
    var img = new Image();
    img.src = path;
    img.onload = function () {
        img.isReady_p = true;
    };
    return img;
}
