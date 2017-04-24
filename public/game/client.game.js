// Create a connection to /the_game web socket
SOCKET = io.connect('/the_game');
SOCKET.emit('request scene change', {newScene: 'main'});

// localStorage.cyUserName = localStorage.cyUserName || JSON.stringify({
//     userName: SOCKET.id
// });

function createImage (path) {
    var img = new Image();
    img.src = path;
    img.onload = function () {
        img.isReady_p = true;
    };
    return img;
}

function randomInRange(min, max) {
    min = +min;
    max = +max;
    return Math.floor(Math.random() * (max - min)) + min;
}

SOCKET.on('give feedback', function (data) {
    if (data.open_p || data.openThenClose_p) {
        var newData = {
            title: 'NOTICE',
            msg: 'YOU NEED TO SPECIFCY a MESSAGE'
        };
        Object.assign(newData, data);
        $('#message-modal-title').html(newData.title);
        $('#message-modal-body').html(newData.msg);
        $('#message-modal').modal('show');
        if (data.openThenClose_p === true) {
            setTimeout(function () {
                $('#message-modal').modal('hide');
            }, 3000);
        }
    }
    else {
        setTimeout(function () {
            $('#message-modal').modal('hide');
        }, 2000);
    }
});

SOCKET.on('player (dis)connect', function (msg) {
    var $toast = $('#toast');
    $toast.html('Player: <b>' + msg.playerName + '</b><br/ >has ' + msg.status + ' the server!');
    $toast = $toast[0];
    $toast.className = "show";
    setTimeout( function () { 
        toast.className = toast.className.replace("show", ""); 
    }, 5000);
});

var GameLoop = function () {
    localStorage.cyUserName = localStorage.cyUserName || JSON.stringify({
        userName: SOCKET.id
    });
    SOCKET.emit('update username', {username: JSON.parse(localStorage.cyUserName).userName});
    var initTS = undefined;
    var sceneControl = new MasterScene();
    this.init = function () {
    	console.log("socket: ", SOCKET)
        window.requestAnimationFrame(_gameLoop);
    };

    this.getCurrentScene = function () {
        return sceneControl.getCurrentScene();
    };

    this.getTS = function () {
        return initTS;
    }

    function _gameLoop (timestamp) {
        _update(timestamp);
        // sceneControl.handleInput();
        _render();

        window.requestAnimationFrame(_gameLoop);
    }

    function _update (timestamp) {
        // console.log("this.initTS", timestamp)
        initTS = timestamp;
        sceneControl.update(timestamp);
    }

    function _render () {
        sceneControl.render();
    };
};
