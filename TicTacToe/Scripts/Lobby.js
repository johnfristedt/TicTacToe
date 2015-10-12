/// <reference path="jquery-2.1.4.js" />
/// <reference path="angular/angular.js" />
/// <reference path="jquery.signalR-2.2.0.js" />
/// <reference path="Initialize.js" />
/// <reference path="Game.js" />

/* ANGULAR LOBBY CONTROLLER */

var lobbyApp = angular.module('lobbyApp', []);
lobbyApp.controller('lobbyCtrl', function ($scope, $http) {

    /* GET SESSIONS FROM SERVER */

    $http.get('api/game/sessions')
        .success(function (data) {
            console.log(data);
            $scope.sessions = data;
        });

    /* UPDATE LOBBY WITH SIGNALR */

    game.client.addSession = function (session) {
        $scope.$apply(function () {
            $scope.sessions.splice(0, 0, session);
        });
    };

    game.client.removeSession = function (sessionId) {
        $scope.$apply(function () {
            for (var i = 0; i < $scope.sessions.length; i++) {
                if ($scope.sessions[i].SessionID == sessionId)
                    $scope.sessions.splice(i, 1);
            }
        });
    };
});

$('#host-game').click(function () {
    $('#session-name').val('');
    $('#board-size-label').html('Board size: 3');
    $('#win-condition-label').html('Row length to win: 3');
    $('#timer-label').html('Timer: 15');
    $('#session-name').focus();
    $('#board-size').val(3);
    $('#win-condition').val(3);
    $('#timer').val(15);
    var wait = setInterval(function () {
        $('#session-name').focus();
        clearInterval(wait);
    }, 500);
});

game.client.buildBoard = function (data) {
    session = data;
    console.log(session);
    startGame(session);
};

$.connection.hub.start().done(function () {

    /* CREATE NEW GAME */

    $('#new-game').click(function () {
        game.server.newGame({
            sessionName: $('#session-name').val(),
            boardSize: $('#board-size').val(),
            winCondition: $('#win-condition').val(),
            timer: $('#timer').val()
        });
    });

    /* JOIN GAME */

    $('#join-game').click(function () {
        game.server.joinGame({
            sessionId: $('#gamelist').find(':selected').attr('sessionid')
        });

        turn = false;
    });
});

function startGame(session) {
    console.log(session);
    $('#progressbar1').progressbar({
        value: session.Timer,
        max: session.Timer
    });
    $('#progressbar2').progressbar({
        value: session.Timer,
        max: session.Timer
    });
    $('#game')
        .toggleClass('hidden')
        .toggleClass('in-right');
    $('#lobby').toggleClass('out-left');
    var wait = setInterval(function () {
        $('#lobby')
            .toggleClass('hidden')
            .toggleClass('out-left');
        $('#game').toggleClass('in-right');
        clearInterval(wait);
    }, 1000);
    buildBoard(session);
}

$('#leave-game').click(function () {
    $('#lobby').toggleClass('hidden').toggleClass('in-right');
    $('#game').toggleClass('out-left');
    var wait = setInterval(function () {
        $('#game').toggleClass('hidden').toggleClass('out-left');
        $('#lobby').toggleClass('in-right');
        $('#grid').html("");
        $('#game-over-message').html("");
        clearInterval(wait);
    }, 1000);
});