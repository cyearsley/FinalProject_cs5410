var tbCharacter = function (data) {

	// data keys:
	//	scale
	//	scaleMax
	//	scaleMin
	//	scaleSpeed
	//	text
	// 	x
	//	y
	//	centerCanvasX

	data.scale = data.scale || 1;
	data.scaleMax = data.scaleMax || 1.1;
	data.scaleMin = data.scaleMin || 1.0;
	data.scaleSpeed = data.scaleSpeed || 0.01;
	data.centerCanvasX = data.centerCanvasX || false;
	data.fontSize = data.fontSize || 40;
	data.shadow = data.shadow || false;
	data.canvasWidth = 1400;
	data.textWidth = false;
	data.sound = data.sound || 'forward';
	data.color = data.color || '#878787';
	data.hoverColor = data.hoverColor || '#f2ff00';
	data.onclick = data.onclick || function () {};

	let status = {
		hasHovered: false
	};

	this.update = function () {
		if (this.mouseHovering_p()) {
			if (data.scale <= data.scaleMax) {
				data.scale += data.scaleSpeed;
				if (status.hasHovered === false) {
					status.hasHovered = true;
					SOUNDBOARD.playSound({type: 'hover', volume: 0.25, loop: false});
				}
			}
			if (sceneInputs.hasClicked_p === true && sceneInputs.hasReleasedClick_p === false) {
				sceneInputs.hasReleasedClick_p = true;
				sceneInputs.hasClicked_p = false;
				SOUNDBOARD.playSound({type: data.sound, volume: 1.0, loop: false});
				data.onclick();
			}
		}
		else {
			if (data.scale >= data.scaleMin) {
				data.scale -= data.scaleSpeed;
				status.hasHovered = false;
			}
		}
	};

	this.render = function (context, canvasWidth, canvasHeight) {
		let fontScale = data.fontSize*data.scale;
		let xPos = null;
		context.save();

		context.font = fontScale*data.scale + 'px Boogaloo';
		data.textWidth = context.measureText(data.text).width;

		if (!this.mouseHovering_p()) {
    		context.fillStyle = data.color;
		}
		else {
			context.fillStyle = data.hoverColor;	
		}

		if (data.centerCanvasX) {
			xPos = canvasWidth/2 - context.measureText(data.text).width/2;
		}
		else {
			xPos = data.x;
		}

		if (data.shadow) {
			let shadowColor = context.shadowColor;
		    let shadowOffsetX = context.shadowOffsetX; 
		    let shadowOffsetY = context.shadowOffsetY; 
		    let shadowBlur = context.shadowBlur;

		    context.shadowColor = "black";
		    context.shadowOffsetX = 0; 
		    context.shadowOffsetY = 0; 
		    context.shadowBlur = 5;
		}

		context.fillText(data.text, xPos, data.y);

		if (data.shadow) {
			// context.shadowColor = shadowColor || undefined;
		 //    context.shadowOffsetX = shadowOffsetX;
		 //    context.shadowOffsetY = shadowOffsetY;
		 //    context.shadowBlur = shadowBlur;
		}


		context.restore();
	}

	this.mouseHovering_p = function () {
		let mouse = sceneInputs.mousePosition;
		let xPos = null;
		if (data.centerCanvasX) {
			xPos = data.canvasWidth/2 - data.textWidth/2;
		}
		else {
			xPos = data.x;
		}

		if (
			mouse.x >= xPos && mouse.x <= xPos + data.textWidth &&
			mouse.y >= data.y - data.fontSize && mouse.y <= data.y + data.fontSize/5
		) {
			return true;
		}
		else {
			return false;
		}
	}
};
