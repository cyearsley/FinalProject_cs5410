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
    		onclick: function () {}
    	}),
    	new tbCharacter({
    		text: 'High Scores',
    		fontSize: 50,
    		centerCanvasX: true,
    		shadow: true,
    		y: 550,
    		sound: 'forward',
    		onclick: function () {}
    	}),
    	new tbCharacter({
    		text: 'Credits',
    		fontSize: 50,
    		centerCanvasX: true,
    		shadow: true,
    		y: 650,
    		sound: 'forward',
    		onclick: function () {}
    	})
    ];
    this.init = function () {

    };
    this.renderScene = function (context, canvasWidth, canvasHeight) {
    	// console.log("CONTEXT: ", context);
    	context.save();

    	context.drawImage(_GS.mainScene.images.logo, canvasWidth/2 - _GS.mainScene.images.logo.width/2, 50);

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
    };
    this.handleInputScene = function () {};
};

_GS.mainScene.images = {
    logo: createImage('./../resources/terrar_logo.PNG')
}