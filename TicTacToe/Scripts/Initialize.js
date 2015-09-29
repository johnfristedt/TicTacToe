/// <reference path="jquery-2.1.4.js" />

var grid;

/* BUILD THE BOARD */

function buildBoard(session) {
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

            element.css('width', (1 / session.BoardSize) * 100 + '%');
            element.css('height', (1 / session.BoardSize) * 100 + '%');

            grid[r][c] = element;

            $('.gridRow').last().append(element);
        }
    }
}