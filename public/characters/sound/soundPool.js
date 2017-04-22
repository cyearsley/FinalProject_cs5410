var SoundPool = function () {

	var soundCache = {
		GameMusic: new Audio('resources/sound/main_music.mp3')
	};

	// Load the sounds
	for (key in soundCache) {
		soundCache[key].load();
	}

	this.playSound = function (data) {
		console.log("PLAY SOUND!");
		data = $.extend({
			volume: .5,
			loop: false
		}, data);
		var newSound = soundCache[data.type];
		newSound.volume = data.volume;
		newSound.loop = data.loop;
		newSound.play();
	};
};
