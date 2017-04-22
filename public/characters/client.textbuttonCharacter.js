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

	let hardWidth = data.text.length * 40;

	this.update = function () {
		if (mouseHovering_p()) {
			if (data.scale <= data.scaleMax) {
				data.scale += data.scaleSpeed;
			}
		}
		else {
			if (data.scale >= data.scaleMin) {
				data.scale -= data.scaleSpeed;
			}
		}
	};

	this.render = function (context, canvasWidth, canvasHeight) {
		let fontScale = data.fontSize*data.scale;
		let xPos = null;
		context.save();

		context.font = fontScale*data.scale + 'px Boogaloo';
		data.textWidth = context.measureText(data.text).width;

		if (!mouseHovering_p()) {
    		context.fillStyle = '#878787';
		}
		else {
			context.fillStyle = '#f2ff00';	
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

	function mouseHovering_p () {
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
