var SoundPool = function () {

	var soundCache = {
		GameMusic: new Audio('resources/sound/main_music.mp3'),
		hover: new Audio('resources/sound/hover.ogg'),
		forward: new Audio('resources/sound/forward.ogg'),
		back: new Audio('resources/sound/back.ogg')
	};

	// Load the sounds
	for (key in soundCache) {
		soundCache[key].load();
	}

	this.playSound = function (data) {
		data = $.extend({
			volume: .5,
			loop: false,
			cut_p: false
		}, data);
		var newSound = soundCache[data.type];
		newSound.volume = data.volume;
		newSound.loop = data.loop;
		if (data.cut_p) {
			newSound.play();
		}
		else {
			var clonedSound = newSound.cloneNode();
			clonedSound.volume = data.volume;
			clonedSound.play();
		}
	};
};
