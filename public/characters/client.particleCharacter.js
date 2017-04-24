var particleCharacter = function (data) {
	this.life = +data.life;
	let initLife = data.life;
	let particleRotation = 0.1;

	this.update = function (ts) {
		this.life = data.life - (ts - data.initTS);
		data.x += data.xDir;
		data.y += data.yDir;
		data.xDir += data.acc;
		data.yDir += data.acc;
		// particleRotation += 0.01;

	};

	this.render = function (context) {
		context.save();

		context.translate(data.x + data.wh / 2, data.y + data.wh / 2);
		// context.rotate(particleRotation);
		context.translate(-(data.x + data.wh / 2), -(data.y + data.wh / 2));
		
		context.fillStyle = data.color;
		context.fillRect(data.x, data.y, data.wh, data.wh);
		
		context.strokeStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		context.strokeRect(data.x, data.y, data.wh, data.wh);

		context.restore();
	};
};