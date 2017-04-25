var _GS = _GS || {};
_GS.highscoresScene = function (canvasObj, contextObj) {
    SOCKET.emit('request scores');
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
		context.fillText('Highscores', 120, 175);

        context.fillStyle = '#000';
        context.font='50px Boogaloo';
        context.fillText('Number Of Blocks Destroyed (top 10):', 600, 120);

        context.font='40px Boogaloo';

        for (let ii = 0; ii < _GS.highscoresScene.sortedUsers.length; ii +=1) {
            if (ii >= 10) {
                break;
            }
            if (JSON.parse(localStorage.cyUserName).userName == _GS.highscoresScene.sortedUsers[ii]) {
                context.fillStyle = 'yellow';
            }
            else {
                context.fillStyle = '#353535';
            }
            context.fillText(ii + 1 + ')' +_GS.highscoresScene.sortedUsers[ii] + ' - ' + _GS.highscoresScene.highscores[_GS.highscoresScene.sortedUsers[ii]], 700, 195 + ii*45);
        }

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

function getHSList (scores) {
    let tempScores = [];
    let bestPrevScore;
    for (key in scores) {
        let currScore = {};
        currScore[key] = scores[key];
        tempScores.push(currScore);
    }
    let sortedScores = [];

    while (tempScores.length > 0) {
        let bestIndex = 0;
        for (let ii = 0; ii < tempScores.length; ii += 1) {
            if (tempScores[ii][Object.keys(tempScores[ii])[0]] > tempScores[bestIndex][Object.keys(tempScores[bestIndex])[0]]) {
                bestIndex = ii;
            }
        }

        sortedScores.push(Object.keys(tempScores[bestIndex])[0]);
        tempScores.splice(bestIndex, 1);
    }
    
    return sortedScores;
}

_GS.highscoresScene.highscores = {};
_GS.highscoresScene.sortedUsers = [];

SOCKET.on('send scores', function (msg) {
    _GS.highscoresScene.highscores = msg.scores;
    _GS.highscoresScene.sortedUsers = getHSList(msg.scores);
    console.log("NEW HIGH SCORES: ", _GS.highscoresScene.highscores);    
})
