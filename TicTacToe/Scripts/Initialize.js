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

/* FIND AND ADD NEIGHBOURS */

//for (var nodeRow = 0; nodeRow < boardSize; nodeRow++) {
//    for (var nodeCol = 0; nodeCol < boardSize; nodeCol++) {
//        for (var r = 0; r < 3; r++) {
//            for (var c = 0; c < 3; c++) {
//                var neighbourRow = nodeRow + (-1 + r);
//                var neighbourCol = nodeCol + (-1 + c);

//                if (neighbourRow == nodeRow && neighbourCol == nodeCol)
//                    continue;

//                if (!outOfBounds(neighbourRow, neighbourCol)) {
//                    grid[nodeRow][nodeCol].neighbours.push(grid[neighbourRow][neighbourCol]);
//                }
//            }
//        }
//    }
//}

/* GAME OBJECTS */

//function Node(player, element) {
//    this.element = element;
//    this.player = player;
//    this.row = parseInt(this.element.attr('row'));
//    this.col = parseInt(this.element.attr('col'));
//    this.neighbours = new Array();
//}

/* HELPER FUNCTIONS */

//function outOfBounds(row, col) {
//    if (row >= 0 && col >= 0 && row < boardSize && col < boardSize)
//        return false;
//    return true;
//}