var _GS = _GS || {};
_GS.controlsScene = function (canvasObj, contextObj) {
    var characters = [
    	new tbCharacter({
    		text: 'Exit To Main',
    		fontSize: 50,
    		centerCanvasX: true,
    		shadow: true,
    		y: 675,
    		sound: 'back',
    		onclick: function () {SOCKET.emit('request scene change', {newScene: 'main'});}
    	})
    ];
    
    let degrees = 0.01;
    let degreeIncr = 0;
    let increaseDegree = true;

    this.renderScene = function (context, canvasWidth, canvasHeight) {
    	context.save();

    	let xPos = 10;
    	let yPos = 30;

    	context.translate(xPos + _GS.mainScene.images.logo.width / 2, yPos + _GS.mainScene.images.logo.height / 2);
		context.rotate(Math.PI*180+degrees);
		context.translate(-(xPos + _GS.mainScene.images.logo.width / 2), -(yPos + _GS.mainScene.images.logo.height / 2));
		// context.translate(-(position.x + dimensions.wh / 2), -(position.y + dimensions.wh / 2));
		context.globalAlpha = 0.2;
    	context.drawImage(_GS.mainScene.images.logo, xPos, yPos);
    	context.globalAlpha = 1.0;
    	context.restore();

    	context.fillStyle = '#353535';
		context.font='90px Boogaloo';
		context.fillText('Control Configs', 50, 175);

    	for (ii in characters) {
    		characters[ii].render(context, canvasWidth, canvasHeight);
    	}
    	context.restore();
    };
    this.updateScene = function () {
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

    	for (ii in characters) {
    		characters[ii].update();
    	}
    };
    this.handleInputScene = function () {};
};