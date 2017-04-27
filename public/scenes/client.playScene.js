var _GS = _GS || {};
_GS.playScene = function (canvasObj, contextObj) {
    var characters = [
        new tbCharacter({
            text: 'Exit To Lobby',
            fontSize: 25,
            shadow: true,
            x: 1250,
            y: 30,
            color: 'white',
            hoverColor: 'red',
            sound: 'back',
            hoverText: 'Exit and Save',
            onclick: function () {
                SOCKET.emit('request score save');
                SOCKET.emit('request scene change', {newScene: 'lobby'});
                SOCKET.emit('create room', {rname: 'lobby', createOrJoin: true});
            }
        })
    ];
    var frameCount = 0;
    var walkCount = 0;
    var otherWalkCount = 0;
    this.back1X = 0;
    this.back2X = 0;
    this.back3X = 0;
    this.back4X = 0;
    this.back1Y = 0;
    this.back2Y = 0;

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
    //      R_cx = -Math.floor(B_w) - A
    //      B_w = ((r_xe - r_xs)-canvas.width)/2
    //      A = (P_x - W[0][Math.floor(D)].actualX)
    //      D = ((r_xe - r_xs)/2)
    //
    //      R_cx = -Math.floor(((r_xe - r_xs)-canvas.width)/2) - (P_x - W[0][Math.floor(((r_xe - r_xs)/2))].actualX)

    //  Where:
    //      R_cx,R_cy = the render x,y starting coordinates.
    //      B_w,B_h = the width/height of the buffer between the render x,y start position and the canvas x,y start position.
    //      P_x,P_y = the players actual x,y positions.
    //      r_xe,r_xs = the subdivisions actual ending x-coord, and starting y-coord.
    //      W_[][] = the subdivision of the entire world to be rendered.
    //
    //          Author: cnyearsley@gmail.com
    // ====================================================================================================================== //

    this.renderScene = function (context, canvasWidth, canvasHeight) {
        context.save();

        // render mountains!
        // context.drawImage(_GS.playScene.images['back2'], this.back2X/20, -350 + this.back1Y, 1000, 1000);
        // context.drawImage(_GS.playScene.images['back2'], this.back2X/20 + 1000,  -350 + this.back1Y, 1000, 1000);
        // context.drawImage(_GS.playScene.images['back2'], this.back2X/20 + 2000,  -350 + this.back1Y, 1000, 1000);

        context.drawImage(_GS.playScene.images['back6'], 0,  -350 + this.back1Y, 1400, 1000);

        context.drawImage(_GS.playScene.images['back5'], this.back3X/15 - 5, -250 + this.back1Y, 1000, 1000);
        context.drawImage(_GS.playScene.images['back5'], this.back3X/15 - 10 + 1000,  -250 + this.back1Y, 1000, 1000);
        context.drawImage(_GS.playScene.images['back5'], this.back3X/15 - 15 + 2000,  -250 + this.back1Y, 1000, 1000);

        context.drawImage(_GS.playScene.images['back4'], this.back4X/20 - 5, -250 + this.back1Y, 1000, 1000);
        context.drawImage(_GS.playScene.images['back4'], this.back4X/20 - 10 + 1000,  -250 + this.back1Y, 1000, 1000);
        context.drawImage(_GS.playScene.images['back4'], this.back4X/20 - 15 + 2000,  -250 + this.back1Y, 1000, 1000);

        context.drawImage(_GS.playScene.images['back3'], this.back3X/15 - 5, -250 + this.back1Y, 1000, 1000);
        context.drawImage(_GS.playScene.images['back3'], this.back3X/15 - 10 + 1000,  -250 + this.back1Y, 1000, 1000);
        context.drawImage(_GS.playScene.images['back3'], this.back3X/15 - 15 + 2000,  -250 + this.back1Y, 1000, 1000);

        context.drawImage(_GS.playScene.images['back2'], this.back2X/10 - 5, -250 + this.back1Y, 1000, 1000);
        context.drawImage(_GS.playScene.images['back2'], this.back2X/10 - 10 + 1000,  -250 + this.back1Y, 1000, 1000);
        context.drawImage(_GS.playScene.images['back2'], this.back2X/10 - 15 + 2000,  -250 + this.back1Y, 1000, 1000);

        context.drawImage(_GS.playScene.images['back1'], this.back1X/5 - 5, -250 + this.back1Y, 1000, 1000);
        context.drawImage(_GS.playScene.images['back1'], this.back1X/5 - 10 + 1000,  -250 + this.back1Y, 1000, 1000);
        context.drawImage(_GS.playScene.images['back1'], this.back1X/5 - 15 + 2000,  -250 + this.back1Y, 1000, 1000);


        // context.drawImage(_GS.playScene.images['back1'], this.back1X/10 - 5, -250 + this.back1Y, 1000, 1000);
        // context.drawImage(_GS.playScene.images['back1'], this.back1X/10 - 10 + 1000,  -250 + this.back1Y, 1000, 1000);
        // context.drawImage(_GS.playScene.images['back1'], this.back1X/10 - 15 + 2000,  -250 + this.back1Y, 1000, 1000);

        // context.drawImage(_GS.playScene.images['back1'], this.back1X/10 - 5, -250 + this.back1Y, 1000, 1000);
        // context.drawImage(_GS.playScene.images['back1'], this.back1X/10 - 10 + 1000,  -250 + this.back1Y, 1000, 1000);
        // context.drawImage(_GS.playScene.images['back1'], this.back1X/10 - 15 + 2000,  -250 + this.back1Y, 1000, 1000);


        
        if (typeof _GS.playScene.divisionToRender !== 'undefined') {

            let blockWH = _GS.playScene.blockWH;
            let divToRender = _GS.playScene.divisionToRender;
            let worldDiv = divToRender.subdivision;
            let renderXStart = worldDiv[0][0].blockIndex_x * blockWH;
            let renderXEnd = worldDiv[0][worldDiv[0].length -1].blockIndex_x * blockWH;

            let B_wx = Math.floor((renderXEnd - renderXStart - canvasWidth)/2); 
            let Dx = Math.floor(worldDiv[0].length/2);
            let Ax = (_GS.playScene.currentPlayer.actualX - worldDiv[0][Dx].blockIndex_x * blockWH);

            let R_cx = 0 - B_wx - Ax;

            let renderYStart = worldDiv[0][0].blockIndex_y * blockWH;
            let renderYEnd = worldDiv[worldDiv.length - 1][0].blockIndex_y * blockWH;

            let B_wy = Math.floor((renderYEnd - renderYStart - canvasHeight)/2);
            let Dy = Math.floor(worldDiv.length/2);
            let Ay = (_GS.playScene.currentPlayer.actualY - worldDiv[Dy][0].blockIndex_y * blockWH);

            let R_cy = 0 - B_wy - Ay;

            for (let ii = 0; ii < worldDiv.length; ii += 1) {
                for (let jj = 0; jj < worldDiv[0].length; jj += 1) {
                    if (worldDiv[ii][jj].backType !== 'empty' && (worldDiv[ii][jj].blockType === 'glass' || worldDiv[ii][jj].blockType === 'slopeLeft' || worldDiv[ii][jj].blockType === 'slopeRight' || worldDiv[ii][jj].blockType === 'empty' || worldDiv[ii][jj].blockType === 'leaves')) {
                        context.drawImage(_GS.playScene.images[worldDiv[ii][jj].backType + 'Back'], R_cx + jj*blockWH, R_cy + ii*blockWH, blockWH, blockWH);
                    }
                    if (worldDiv[ii][jj].blockType !== 'empty' && _GS.playScene.images[worldDiv[ii][jj].blockType].isReady_p) {
                        context.drawImage(_GS.playScene.images[worldDiv[ii][jj].blockType], R_cx + jj*blockWH, R_cy + ii*blockWH, blockWH, blockWH);
                    }
                    if (sceneInputs.mousePosition.x >= R_cx + jj*blockWH && sceneInputs.mousePosition.x < R_cx + jj*blockWH + blockWH &&
                        sceneInputs.mousePosition.y >= R_cy + ii*blockWH && sceneInputs.mousePosition.y < R_cy + ii*blockWH + blockWH &&
                        (worldDiv[ii][jj].blockType !== 'empty' || worldDiv[ii-1][jj].blockType !== 'empty' || worldDiv[ii+1][jj].blockType !== 'empty' || worldDiv[ii][jj-1].blockType !== 'empty' || worldDiv[ii][jj+1].blockType !== 'empty')
                    ) {
                        context.strokeStyle = 'yellow';
                        context.strokeRect(R_cx + jj*blockWH, R_cy + ii*blockWH, blockWH, blockWH);
                    }
                }
            }

            // render other players.
            let players = _GS.playScene.players;
            for (let ii = 0; ii < players.length; ii += 1) {
                if (players[ii].socket_id !== SOCKET.id) {

                    context.fillStyle = 'rgba(0,0,0,0.5)';
                    context.font='25px Boogaloo';
                    context.fillRect(R_cx + players[ii].actualX - renderXStart - context.measureText(players[ii].username).width/2 + blockWH/2 - 5, R_cy + players[ii].actualY - renderYStart - 40, context.measureText(players[ii].username).width + 10, 30);

                    contextObj.context_game.font = "20px Boogaloo";
                    contextObj.context_game.fillStyle = 'white';
                    context.fillText(players[ii].username, R_cx + players[ii].actualX - renderXStart - context.measureText(players[ii].username).width/2 + blockWH/2, R_cy + players[ii].actualY - renderYStart - 20);

                    let otherWalkPhase = Math.ceil(otherWalkCount/5);

                    context.drawImage(_GS.playScene.images['op' + otherWalkPhase], R_cx + players[ii].actualX - renderXStart, R_cy + players[ii].actualY - renderYStart, blockWH, blockWH*2);
                }
                else {
                    context.fillStyle = 'rgba(0,0,0,0.5)';
                    context.font='25px Boogaloo';
                    context.fillRect(R_cx + players[ii].actualX - renderXStart - context.measureText(players[ii].username).width/2 + blockWH/2 - 5, 310, context.measureText(players[ii].username).width + 10, 30);

                    contextObj.context_game.font = "20px Boogaloo";
                    contextObj.context_game.fillStyle = 'yellow';
                    context.fillText(players[ii].username, R_cx + players[ii].actualX - renderXStart - context.measureText(players[ii].username).width/2 + blockWH/2, R_cy + players[ii].actualY - renderYStart - 20);
                }
            }

            // console.log("CURRENT PLAYERS: ", _GS.playScene.currentPlayer)


            // context.beginPath();
            // context.moveTo(0,0);
            // context.lineTo(700,350);
            // context.stroke();
        }

        // context.translate(-canvasWidth, 0);
        for (key in characters) {
            characters[key].render(context, canvasWidth, canvasHeight);
        }

        TB.render(context, canvasWidth, canvasHeight);
        // draw current player
        let walkPhase = Math.ceil(walkCount/5);
        let x = canvasWidth/2;
        if (_GS.playScene.currentPlayer.direction === 'left') {
            context.translate(canvasWidth, 0);
            context.scale(-1, 1);
            x = x - 30;
        }
        if (_GS.playScene.currentPlayer.isMoving) {
            context.drawImage(_GS.playScene.images['cp' + walkPhase], x, canvasHeight/2, 30, 30*2);
        }
        else {
            context.drawImage(_GS.playScene.images['cp2'], x, canvasHeight/2, 30, 30*2);
        }
        context.restore();
    };
    this.updateScene = function () {
    	// console.log("UPDATE PLAY SCENE!");
        this.back1X = -(_GS.playScene.currentPlayer.actualX%4950);
        this.back2X = -(_GS.playScene.currentPlayer.actualX%9950);
        this.back3X = -(_GS.playScene.currentPlayer.actualX%14950);
        this.back4X = -(_GS.playScene.currentPlayer.actualX%19950);
        // this.back1Y = -(_GS.playScene.currentPlayer.actualY);
        for (key in characters) {
            characters[key].update();
        }

        frameCount += 1;
        walkCount += 1;
        otherWalkCount += 1;
        if (frameCount >= 50) {
            frameCount = 0;
            SOCKET.emit('get rendered division', {blockWH: _GS.playScene.blockWH});
            console.log("Get rendered div!");
        }

        if (walkCount >= 30) {
            walkCount = 1;
        }
        if (otherWalkCount >= 30) {
            otherWalkCount = 1;
        }
    };
    this.handleInputScene = function () {

    };
};

_GS.playScene.blockWH = 30;

_GS.playScene.images = {
    grass: createImage('resources/world-tiles/Grass.png'),
    dirt: createImage('resources/world-tiles/Dirt.png'),
    stone: createImage('resources/world-tiles/Stone.png'),
    tnt: createImage('resources/world-tiles/Tnt.png'),
    coal: createImage('resources/world-tiles/Coal.png'),
    wood: createImage('resources/world-tiles/wood.png'),
    woodPlank: createImage('resources/world-tiles/wood_plank.png'),
    bricks: createImage('resources/world-tiles/Bricks.png'),
    glass: createImage('resources/world-tiles/Glass.png'),
    leaves: createImage('resources/world-tiles/Leaves.png'),
    slopeLeft: createImage('resources/world-tiles/plank-left.png'),
    slopeRight: createImage('resources/world-tiles/plank-right.png'),
    back1: createImage('resources/background/tree1.png'),
    back2: createImage('resources/background/tree2.png'),
    back3: createImage('resources/background/mountain1.png'),
    back4: createImage('resources/background/mountain2.png'),
    back5: createImage('resources/background/clouds.png'),
    back6: createImage('resources/background/background.png'),

    // load back images
    dirtBack: createImage('resources/world-tiles/Dirt-back.png'),
    grassBack: createImage('resources/world-tiles/Dirt-back.png'),
    bricksBack: createImage('resources/world-tiles/Bricks-back.png'),
    glassBack: createImage('resources/world-tiles/Glass-back.png'),
    slopeLeftBack: createImage('resources/world-tiles/plank-left-back.png'),
    slopeRightBack: createImage('resources/world-tiles/plank-right-back.png'),
    stoneBack: createImage('resources/world-tiles/Stone-back.png'),
    woodPlankBack: createImage('resources/world-tiles/wood_plank-back.png'),

    //Players
    cp1: createImage('resources/characters/walk-me/walk1.png'),
    cp2: createImage('resources/characters/walk-me/walk2.png'),
    cp3: createImage('resources/characters/walk-me/walk3.png'),
    cp4: createImage('resources/characters/walk-me/walk4.png'),
    cp5: createImage('resources/characters/walk-me/walk5.png'),
    cp6: createImage('resources/characters/walk-me/walk6.png'),

    op1: createImage('resources/characters/walk-them/walk_000.png'),
    op2: createImage('resources/characters/walk-them/walk_001.png'),
    op3: createImage('resources/characters/walk-them/walk_002.png'),
    op4: createImage('resources/characters/walk-them/walk_003.png'),
    op5: createImage('resources/characters/walk-them/walk_004.png'),
    op6: createImage('resources/characters/walk-them/walk_005.png')
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
    _GS.playScene.players = msg.players;
    // console.log("PLAYERS: ", _GS.players[0]);    
});

SOCKET.on('update rendered division', function (msg) {
    // console.log("NEW rendered division: ", msg);
    _GS.playScene.divisionToRender = msg;
});

SOCKET.on('update world properties', function (msg) {
    _GS.worldProperties = msg.worldProperties;
    console.log("NEW world props: ", _GS.playScene.worldProperties);
});

SOCKET.on('notify world change', function (msg) {
    if (typeof msg !== 'undefined') {
        let particlePosX = msg.worldX*30 - _GS.playScene.currentPlayer.actualX + 700;
        let particlePosY = msg.worldY*30 - _GS.playScene.currentPlayer.actualY + 350;
        if (msg.action && msg.action === 'destroy block') {
            PG.createParticles({
                colors: ['#703f04', '#595653', '#847f7b', '#1d5b09'],
                xRange: {min: particlePosX, max: particlePosX},
                yRange: {min: particlePosY, max: particlePosY},
                xDir: {min: -10, max: 10},
                yDir: {min: -5, max: 10},
                count: 10,
                lifeSpan: {min: 100, max: 200},
                wh: {min: 5, max: 15}
            });
            SOUNDBOARD.playSound({type: 'dig', volume: 0.75, loop: false});
        }
    }
    SOCKET.emit('get rendered division', {blockWH: _GS.playScene.blockWH});
});

function createImage (path) {
    var img = new Image();
    img.src = path;
    img.onload = function () {
        img.isReady_p = true;
    };
    return img;
}
