var _GS = _GS || {};

function validateControls (mu, md, ml, mr) {
	if (
		mu !== '' &&
		md !== '' &&
		ml !== '' &&
		mr !== '' &&
		mu !== md && mu !== ml && mu !== mr &&
		md !== ml && md !== mr &&
		ml !== mr
	) {
		return true;
	}
	else {
		return false;
	}
}

_GS.controlsScene = function (canvasObj, contextObj) {

	let oldControls = JSON.parse(localStorage.cyControls);
	let $mu = $('#move-up-control');
	let $md = $('#move-down-control');
	let $ml = $('#move-left-control');
	let $mr = $('#move-right-control');
	let $username = $('#username-input');
	$username.val(JSON.parse(localStorage.cyUserName).userName);
	$username.prop('hidden', false);

	for (key in oldControls) {
		console.log("key: ", key);
		if (oldControls[key].action === 'move up') {
			$mu.val(key.toUpperCase());
		}
		else if (oldControls[key].action === 'move down') {
			$md.val(key.toUpperCase());
		}
		else if (oldControls[key].action === 'move left') {
			$ml.val(key.toUpperCase());
		}
		else if (oldControls[key].action === 'move right') {
			$mr.val(key.toUpperCase());
		}
	}

    var characters = [
    	new tbCharacter({
    		text: 'Exit Without Saving',
    		hoverColor: 'red',
    		fontSize: 50,
    		x: 300,
    		shadow: true,
    		y: 675,
    		sound: 'back',
    		onclick: function () {
    			SOCKET.emit('request scene change', {newScene: 'main'});
    			$('#controls-form-id').prop('hidden', true);
    			$username.prop('hidden', true);
    		}
    	}),
    	new tbCharacter({
    		text: 'Exit And Save',
    		hoverColor: 'green',
    		fontSize: 50,
    		x: 750,
    		shadow: true,
    		y: 675,
    		sound: 'forward',
    		onclick: function () {
    			if (validateControls($mu.val(), $md.val(), $ml.val(), $mr.val()) && $username.val() !== '') {
	    			let newControls = {};
	    			newControls[$ml.val().toLowerCase()] = {
	    				'pressed': false,
						// 'updated': true,
						'action': 'move left'
	    			};
	    			newControls[$mr.val().toLowerCase()] = {
	    				'pressed': false,
						// 'updated': true,
						'action': 'move right'
	    			};
	    			newControls[$mu.val().toLowerCase()] = {
	    				'pressed': false,
						// 'updated': true,
						'action': 'move up'
	    			};
	    			newControls[$md.val().toLowerCase()] = {
	    				'pressed': false,
						// 'updated': true,
						'action': 'move down'
	    			};

	    			Object.assign(newControls, {
						mousePosition: {
							x: null,
							y: null
						},
						hasClicked_p: false,
						hasReleasedClick_p: true
					});

	    			sceneInputs = newControls;
	    			localStorage.cyControls = JSON.stringify(newControls)
	    			localStorage.cyUserName = JSON.stringify({userName: $username.val()});
	    			SOCKET.emit('update username', {username: $username.val()});
    			}

    			SOCKET.emit('request scene change', {newScene: 'main'});
    			$('#controls-form-id').prop('hidden', true);
    			$username.prop('hidden', true);
    		}
    	})
    ];
    
    let degrees = 0.01;
    let degreeIncr = 0;
    let increaseDegree = true;
    $('#controls-form-id').prop('hidden', false);

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
		context.fillText('Options / Controls', 20, 175);

		context.fillStyle = '#252525';
		context.font='50px Boogaloo';
		context.fillText('Character Move Up - ', 750, 80);
		context.fillText('Character Move Down - ', 710, 235);
		context.fillText('Character Move Left - ', 730, 385);
		context.fillText('Character Move Right - ', 710, 535);
		context.fillText('User Name', 230, 380);

		context.fillStyle = '#555555';
		context.font='20px Boogaloo';
		context.fillText('This username will be used to record highscores', 170, 480);
		context.fillText('If you fail to supply one, a random hash will be assigned instead', 120, 510);

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