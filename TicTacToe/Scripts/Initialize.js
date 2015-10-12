/// <reference path="jquery-2.1.4.js" />
/// <reference path="jqueryui/jquery-ui.js" />

var grid;
var cross = $('<div/>')
                .addClass('cross');
var circle = $('<div/>')
                .addClass('circle');



//$(cross).css('width', parseInt($(cross).css('width')) / 3);
//$(cross).css('width', parseInt($(cross).css('width')) / 3);

//buildBoard({ BoardSize: 3 });

/* BUILD THE BOARD */

function buildBoard(session) {
    $('#markers').css('width', '80vh / ' + session.BoardSize);
    $('#markers').css('height', '80vh / ' + session.BoardSize);

    $('#markers').append(
        $('<div/>')
            .attr('id', 'the-marker')
            .addClass('cross')
            .addClass('marker')
    );

    $('#the-marker').draggable();
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
                    //$(this).append($(cross).clone());
                    
                    var row = parseInt($(this).attr('row'));
                    var col = parseInt($(this).attr('col'));

                    game.server.turn({
                        sessionId: session.SessionID,
                        playerIndex: session.PlayerIndex,
                        row: row,
                        col: col
                    });
                }
            });

            grid[r][c] = element;

            $('.gridRow').last().append(element);
        }
    }
}