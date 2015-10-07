/// <reference path="jquery-2.1.4.js" />
/// <reference path="Initialize.js" />

var debug = false;
var session;

var game = $.connection.ticTacToeHub;

game.client.turn = function (row, col, turn) {
    if (session.playerIndex == 2)
        turn = !turn;

    if (turn)
        grid[col][row].css('background-color', 'red');
    else
        grid[col][row].css('background-color', 'blue');
};

game.client.gameOver = function (data) {
    $('#game-over-message').html('Player ' + data + ' wins!');
};

$.connection.hub.start().done(function () {

    /* PLAYER TURN */

    $('#grid').on('click', '.node', function () {
        var row = parseInt($(this).attr('row'));
        var col = parseInt($(this).attr('col'));

        game.server.turn({
            sessionId: session.SessionID,
            playerIndex: session.PlayerIndex,
            row: row,
            col: col
        });
    });

    $('#leave-game').click(function () {
        game.server.leaveGame({ SessionID: session.SessionID });
    });

});