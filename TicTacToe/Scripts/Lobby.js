/// <reference path="jquery-2.1.4.js" />
/// <reference path="jquery.signalR-2.2.0.js" />
/// <reference path="Initialize.js" />
/// <reference path="Game.js" />

/* GET ACTIVE SESSIONS FROM SERVER */

$.ajax({
    url: 'api/game/sessions',
    type: 'GET',
    success: function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++)
            $('#gamelist').append($('<option></option>')
                                    .html(data[i].SessionName)
                                    .attr('sessionid', data[i].SessionID));
    }
});

game.client.buildBoard = function (data) {
    loadBoard(data);
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

function loadBoard(data) {
    session = data;
    $('#lobby').toggleClass('hidden');
    $('#game').toggleClass('hidden');

    buildBoard(data);
}