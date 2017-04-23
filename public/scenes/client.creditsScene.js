var _GS = _GS || {};
_GS.creditsScene = function (canvasObj, contextObj) {
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
		context.fillText('Credits', 190, 175);

		context.fillStyle = '#252525';
		context.font='60px Boogaloo';
		context.fillText('Game Development - ', 25, 350);
		context.fillText('Music/SFX - ', 25, 450);
		context.fillText('Art - ', 25, 550);
		context.fillText('Node Modules Used:', 800, 50);

		context.fillStyle = '#555555';
		context.fillText('Caleb Yearsley', 460, 350);
		context.fillText('https://opengameart.org/', 300, 450);
		context.fillText('Caleb Yearsley AND https://opengameart.org/', 140, 550);

		context.font='30px Boogaloo';

		context.fillText('1) socket.io - Web Sockets', 850, 100);
		context.fillText('2) express', 850, 130);
		context.fillText('3) path', 850, 160);
		context.fillText('4) uuid', 850, 190);

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