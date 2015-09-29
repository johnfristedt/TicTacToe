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

    game.client.addSession = function (session) {
        $scope.sessions = [
            session
        ];
        console.log($scope.sessions);
    };
});

$('#host-game').click(function () {
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
            winCondition: $('#win-condition').val()
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
    $('#lobby').toggleClass('fade-out');
    var wait = setInterval(function () {
        $('#lobby').toggleClass('hidden');
        $('#game').toggleClass('fade-in');
        $('#game').toggleClass('hidden');
        clearInterval(wait);
    }, 1000);
    buildBoard(session);
}