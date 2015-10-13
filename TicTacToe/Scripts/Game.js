/// <reference path="jquery-2.1.4.js" />
/// <reference path="Initialize.js" />

var debug = false;
var session;
var timerSwitch;

var game = $.connection.ticTacToeHub;

game.client.turn = function (row, col, turn) {
    if (session.playerIndex == 2)
        turn = !turn;

    clearInterval(timerSwitch);
    timerSwitch = setInterval(function () {
        if (!turn) $('#progressbar1').progressbar('option', 'value', parseInt($('#progressbar1').progressbar('option', 'value')) - 1);
        else       $('#progressbar2').progressbar('option', 'value', parseInt($('#progressbar2').progressbar('option', 'value')) - 1);

        if (parseInt($('#progressbar' + session.PlayerIndex).progressbar('option', 'value')) == 0) {
            console.log('out of time');
            game.server.outOfTime({
                SessionID: session.SessionID,
                PlayerIndex: session.PlayerIndex
            });
        }
    }, 1000);

    if (turn)
        grid[col][row].append($(crossPrefab).clone());
    else
        grid[col][row].append($(circlePrefab).clone());

    setCss();
};

game.client.gameOver = function (data) {
    console.log(data);
    clearInterval(timerSwitch);
    $('#markers').html('');
    $('#game-over-message').html(data);
};

$.connection.hub.start().done(function () {

    /* PLAYER TURN */

    //$('#grid').on('click', '.node', function () {
    //    var row = parseInt($(this).attr('row'));
    //    var col = parseInt($(this).attr('col'));

    //    game.server.turn({
    //        sessionId: session.SessionID,
    //        playerIndex: session.PlayerIndex,
    //        row: row,
    //        col: col
    //    });
    //});

    $('#leave-game').click(function () {
        game.server.leaveGame({ SessionID: session.SessionID });
    });

});