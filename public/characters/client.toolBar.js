var toolBarCharacter = function (data) {
	data['`'] = data['`'] || 'empty';
	data['1'] = data['1'] || 'grass';
	data['2'] = data['2'] || 'dirt';
	data['3'] = data['3'] || 'stone';
	data['4'] = data['4'] || 'planks';
	data['5'] = data['5'] || 'wood';
	data['6'] = data['6'] || 'brick';
	data['7'] = data['7'] || 'stone brick';
	data['8'] = data['8'] || 'leaves';
	data['9'] = data['9'] || 'glass';
	data['0'] = data['0'] || 'door';
	data['-'] = data['-'] || 'slope left';
	data['='] = data['='] || 'slope right';

	this.itemSelected = '1';

	this.update = function (ts) {

	};

	this.render = function (conext, canvasWidth, canvasHeight) {
		let itemsLength = Object.keys(data).length;

		
	};
};