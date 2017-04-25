var toolBarCharacter = function (data) {
	data = data || {};
	data['1'] = data['1'] || 'grass';
	data['2'] = data['2'] || 'dirt';
	data['3'] = data['3'] || 'stone';
	data['4'] = data['4'] || 'woodPlank';
	data['5'] = data['5'] || 'wood';
	data['6'] = data['6'] || 'bricks';
	data['7'] = data['7'] || 'leaves';
	data['8'] = data['8'] || 'glass';
	data['9'] = data['9'] || 'empty';
	data['0zero'] = data['0zero'] || 'slopeLeft';
	data['dash'] = data['dash'] || 'slopeRight';

	let itemSelected = '1';

	this.setItemSelected = function (key) {
		if (key === '-') {key = 'dash'};
		if (key === '0') {key = '0zero'};
		itemSelected = key;
	};

	this.getItemSelected = function () {
		return data[itemSelected];
	};

	this.testIfKey = function (key) {
		if (key === '-') {key = 'dash'};
		if (key === '0') {key = '0zero'};
		if (typeof data[key] !== 'undefined') {
			return true;
		}
		else {
			return false;
		}
	}

	this.update = function (ts) {

	};

	this.render = function (context, canvasWidth, canvasHeight) {
		let itemsLength = Object.keys(data).length;
		let index = 0;

		context.save();

		for (key in data) {
			if (key === itemSelected) {
				context.strokeStyle = 'rgba(255,0,0,1.0)';	
				context.fillStyle = 'rgba(255,255,0,0.2)';
			}
			else {
				context.strokeStyle = 'rgba(0,0,0,0.7)';
				context.fillStyle = 'rgba(0,0,0,0.2)';
			}

			context.strokeRect(canvasWidth/2 - 42*5 - 5 + index*42, canvasHeight - 50, 40, 40);
			context.fillRect(canvasWidth/2 - 42*5 - 5 + index*42, canvasHeight - 50, 40, 40);
			if (data[key] !== 'empty' && _GS.playScene.images[data[key]].isReady_p) {
				context.drawImage(_GS.playScene.images[data[key]], canvasWidth/2 - 42*5 + index*42, canvasHeight - 45, 30, 30)
			}
			index += 1;
		}

		context.restore();
	};
};