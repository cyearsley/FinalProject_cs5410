var particleGenerator = function () {
	let particles = [];
	this.createParticles = function (data) {
		data.count = data.count || 10;
		data.colors = data.colors || [];
		data.lifeSpan = data.lifeSpan || {min: 100, max: 300};
		data.xRange = data.xRange || {min: 700, max: 700};
		data.yRange = data.yRange || {min: 350, max: 350};
		data.xDir = data.xDir || {min: -15, max: 15};
		data.yDir = data.yDir || {min: -5, max: 15};
		data.acc = data.acc || -0.005;
		data.wh = data.wh || {min: 5, max: 10};
		data.initTS = data.initTS || GAMELOOP.getTS();
		for (let ii = 0; ii < data.count; ii += 1) {
			// create particles
			particles.push(new particleCharacter({
				color: data.colors[randomInRange(0, data.colors.length)],
				life: randomInRange(data.lifeSpan.min, data.lifeSpan.max),
				x: randomInRange(data.xRange.min, data.xRange.max),
				y: randomInRange(data.yRange.min, data.yRange.max),
				xDir: randomInRange(data.xDir.min, data.xDir.max),
				yDir: randomInRange(data.yDir.min, data.yDir.max),
				acc: +data.acc,
				initTS: data.initTS,
				wh: randomInRange(data.wh.min, data.wh.max)
			}));
		}
	}

	this.renderParticles = function (context) {
		for (index in particles) {
			particles[index].render(context);
		}
	};

	this.updateParticles = function (ts) {
		for (index in particles) {
			particles[index].update(ts);
			if (particles[index].life <= 0) {
				particles.splice(index, 1);
			}
		}
	};
};
