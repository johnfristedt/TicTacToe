/// <reference path="jquery-2.1.4.js" />
/// <reference path="jqueryui/jquery-ui.js" />

var grid;
var boardSize;
var crossPrefab;
var circlePrefab;

//buildBoard({ PlayerIndex: 1, BoardSize: 3 });

/* BUILD THE BOARD */

function buildBoard(session) {
    boardSize = session.BoardSize;
    buildPrefabs();
    spawnMarker(session.PlayerIndex);
    setCss();

    grid = new Array(session.BoardSize);
    for (var i = 0; i < session.BoardSize; i++) {
        grid[i] = new Array(session.BoardSize);
    }

    for (var r = 0; r < session.BoardSize; r++) {
        $('#grid').append($('<tr></tr>').addClass('gridRow'));

        for (var c = 0; c < session.BoardSize; c++) {
            var element = $('<td></td>')
                            .addClass('node')
                            .attr('row', r)
                            .attr('col', c);

            element.css('width', 100 / session.BoardSize + '%');
            element.css('height', 100 / session.BoardSize + '%');
            element.droppable({
                over: function () {
                    $(this).css('background-color', 'gray');
                },
                out: function () {
                    $(this).css('background-color', 'white');
                },
                drop: function () {
                    $(this).css('background-color', 'white');

                    var row = parseInt($(this).attr('row'));
                    var col = parseInt($(this).attr('col'));

                    game.server.turn({
                        sessionId: session.SessionID,
                        playerIndex: session.PlayerIndex,
                        row: row,
                        col: col
                    });

                    $('#the-marker').remove();
                    spawnMarker(session.PlayerIndex);
                }
            });

            grid[r][c] = element;

            $('.gridRow').last().append(element);
        }
    }
}

function buildPrefabs() {
    crossPrefab = $('<div/>').addClass('cross');
    crossPrefab.append($('<div/>').addClass('crossInner'));
    circlePrefab = $('<div/>').addClass('circle');
}

function spawnMarker(playerIndex) {
    var marker;

    if (playerIndex == 1)
        marker = $(crossPrefab).clone();
    else
        marker = $(circlePrefab).clone();

    $(marker).attr('id', 'the-marker');
    $('#markers').append(marker);
    $(marker).draggable();
}

function setCss() {
    var unit = $(window).width() < 990 ? 'vw' : 'vh';

    $('.cross')
        .css('width', 'calc(80' + unit + ' / ' + boardSize * 4 + ')')
        .css('height', 'calc(80' + unit + ' / ' + boardSize + ')');

    $('.crossInner')
        .css('width', 'calc(80' + unit + ' / ' + boardSize + ')')
        .css('height', 'calc(80' + unit + ' / ' + boardSize * 4 + ')')
        .css('top', 'calc(((80' + unit + ' / ' + boardSize + ') / 2) - ((80' + unit + ' / ' + boardSize * 4 + ') / 2))')
        .css('left', 'calc(((80' + unit + ' / ' + boardSize * 4 + ') / 2) - ((80' + unit + ' / ' + boardSize + ') / 2))')

    $('.circle')
        .css('width', 'calc(75' + unit + ' / ' + boardSize + ')')
        .css('height', 'calc(75' + unit + ' / ' + boardSize + ')')
        .css('border-width', '3' + unit);
}

$(window).resize(function () {
    setCss();
});