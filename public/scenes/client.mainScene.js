var _GS = _GS || {};
_GS.mainScene = function (canvasObj, contextObj) {
    var characters = [];
    SOUNDBOARD.playSound({type: 'GameMusic', volume: 1.0, loop: true});
    this.init = function () {

    };
    this.renderScene = function (context, canvasWidth, canvasHeight) {
    	// console.log("CONTEXT: ", context);
    	context.save();

    	context.drawImage(_GS.mainScene.images.logo, canvasWidth/2 - _GS.mainScene.images.logo.width/2, 50);

    	context.restore();
    };
    this.updateScene = function () {

    };
    this.handleInputScene = function () {};
};

_GS.mainScene.images = {
    logo: createImage('./../resources/terrar_logo.PNG')
}