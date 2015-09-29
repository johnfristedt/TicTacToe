/// <reference path="jquery-2.1.4.js" />
/// <reference path="Initialize.js" />

var debug = false;
var session;

var game = $.connection.ticTacToeHub;

game.client.turn = function (row, col, turn) {
    console.log(turn);
    if (turn)
        grid[col][row].css('background-color', 'red');
    else
        grid[col][row].css('background-color', 'blue');
};

game.client.gameOver = function (data) {
    $('#game-over-message').html('Player ' + data + ' wins!');
    gameOver = true;
};

$.connection.hub.start().done(function () {

    /* PLAYER TURN */

    $('#grid').on('click', '.node', function () {
        console.log('one');
        $.ajax({
            url: 'api/game/turn',
            data: {
                sessionId: session.SessionID,
                playerIndex: session.PlayerIndex,
                row: 0,
                col: 0
            },
            type: 'POST',
            success: function (data) {
                console.log('two');
                if (data == true) {
                    console.log('three');
                    var row = parseInt($(this).attr('row'));
                    var col = parseInt($(this).attr('col'));

                    game.server.turn({
                        sessionId: session.SessionID,
                        playerIndex: session.PlayerIndex,
                        row: row,
                        col: col
                    });
                }
            }
        });
    });

});