var _GS = _GS || {};
_GS.mainScene = function (canvasObj, contextObj) {
    var characters = [
    	new tbCharacter({
    		text: 'Multiplayer Lobby',
    		fontSize: 50,
    		centerCanvasX: true,
    		shadow: true,
    		y: 350,
    		sound: 'forward',
    		onclick: function () {SOCKET.emit('request scene change', {newScene: 'lobby'});}
    	}),
    	new tbCharacter({
    		text: 'Control Configurations',
    		fontSize: 50,
    		centerCanvasX: true,
    		shadow: true,
    		y: 450,
    		sound: 'forward',
    		onclick: function () {SOCKET.emit('request scene change', {newScene: 'controls'});}
    	}),
    	new tbCharacter({
    		text: 'High Scores',
    		fontSize: 50,
    		centerCanvasX: true,
    		shadow: true,
    		y: 550,
    		sound: 'forward',
    		onclick: function () {SOCKET.emit('request scene change', {newScene: 'highscores'});}
    	}),
    	new tbCharacter({
    		text: 'Credits',
    		fontSize: 50,
    		centerCanvasX: true,
    		shadow: true,
    		y: 650,
    		sound: 'forward',
    		onclick: function () {SOCKET.emit('request scene change', {newScene: 'credits'});}
    	})
    ];

    let degrees = 0.01;
    let degreeIncr = 0;
    let increaseDegree = true;

    this.init = function () {

    };
    this.renderScene = function (context, canvasWidth, canvasHeight) {
    	// console.log("CONTEXT: ", context);
    	context.save();

    	let xPos = canvasWidth/2 - _GS.mainScene.images.logo.width/2;
    	let yPos = 50;

    	context.translate(xPos + _GS.mainScene.images.logo.width / 2, yPos + _GS.mainScene.images.logo.height / 2);
		context.rotate(Math.PI*180+degrees);
		context.translate(-(xPos + _GS.mainScene.images.logo.width / 2), -(yPos + _GS.mainScene.images.logo.height / 2));
		// context.translate(-(position.x + dimensions.wh / 2), -(position.y + dimensions.wh / 2));

    	context.drawImage(_GS.mainScene.images.logo, canvasWidth/2 - _GS.mainScene.images.logo.width/2, 50);

    	context.restore();

    	// let text = "Multiplayer Lobby";
    	// context.font="50px Boogaloo";
    	// context.fillStyle = "#878787";

		// context.shadowColor = "black";
		// context.shadowOffsetX = 0; 
		// context.shadowOffsetY = 0; 
		// context.shadowBlur = 5;
		// context.textBaseline = 'alphabetic';
		// context.scale(1,1);

		// context.fillText(text, canvasWidth/2 - context.measureText(text).width/2, 350);

		// text = "Control Configurations";
		// context.fillText(text, canvasWidth/2 - context.measureText(text).width/2, 450);

		// text = "High Scores";
		// context.fillText(text, canvasWidth/2 - context.measureText(text).width/2, 550);

		// text = "Credits";
		// context.fillText(text, canvasWidth/2 - context.measureText(text).width/2, 650);

		for (let ii = 0; ii < characters.length; ii += 1) {
			characters[ii].render(context, canvasWidth, canvasHeight);
		}

    	context.restore();
    };
    this.updateScene = function () {
    	for (let ii = 0; ii < characters.length; ii += 1) {
			characters[ii].update();
		}
		if (increaseDegree === true) {
			if (degreeIncr <= 120) {
				degreeIncr += 1;
				degrees += degreeIncr*0.00001;
			}
			else {
				increaseDegree = false;
			}
		}
		else {
			if (degreeIncr >= -130) {
				degreeIncr -= 1.1;
				degrees += degreeIncr*0.000015;
			}
			else {
				increaseDegree = true;
			}
		}
    };
    this.handleInputScene = function () {};
};

_GS.mainScene.images = {
    logo: createImage('./../resources/terrar_logo.PNG')
}