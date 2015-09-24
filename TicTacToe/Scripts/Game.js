/// <reference path="jquery-2.1.4.js" />
/// <reference path="Initialize.js" />

var debug = false;
var gameOver = false;
var turn = true;
var turns = 0;

/* PLAYER INPUT */

$('.node').click(function () {
    var row = parseInt($(this).attr('row'));
    var col = parseInt($(this).attr('col'));

    $.ajax({
        url: 'api/game/test',
        data: { player: turn ? 1 : 2, row: row, col: col },
        type: 'POST',
        success: function (data) {
            console.log('Success');
        }
    });



    if (!gameOver && grid[row][col].player == 0) {
        if (turn)
            $(this).css('background-color', 'red');
        else
            $(this).css('background-color', 'blue');

        turn ? grid[row][col].player = 1 : grid[row][col].player = 2;

        winCheck(row, col);

        turn = !turn;
        turns++;

        if (turns == boardSize * boardSize && !gameOver) {
            $('#game-over-message').html('Draw');
            gameOver = true;
        }
    }
});

/* CHECK FOR WIN */

function winCheck(row, col) {
    var currentNode = grid[row][col];

    for (var i = 0; i < currentNode.neighbours.length; i++) {
        var currentNeighbour = currentNode.neighbours[i];

        if (currentNeighbour.player == currentNode.player) {
            var streak = 2;

            while (true) {
                var nextRow = (currentNeighbour.row - currentNode.row) + currentNeighbour.row;
                var nextCol = (currentNeighbour.col - currentNode.col) + currentNeighbour.col;

                if (!outOfBounds(nextRow, nextCol)) {
                    currentNode = currentNeighbour;
                    currentNeighbour = grid[nextRow][nextCol];

                    if (currentNeighbour.player == currentNode.player)
                        streak++;
                    else
                        break;

                    if (streak == winCondition) {
                        $('#game-over-message').html('Player ' + currentNode.player + ' wins!');
                        gameOver = true;
                        break;
                    }
                }
                else
                    break;
            }
        }

        currentNode = grid[row][col];
    }
}

/* DEBUG */

if (debug) {
    console.log(grid);

    $('.node').hover(function () {
        var row = parseInt($(this).attr('row'));
        var col = parseInt($(this).attr('col'));

        for (var i = 0; i < grid[row][col].neighbours.length; i++) {
            grid[row][col].neighbours[i].element[0].innerHTML = 'X';
        }
    }, function () {
        clear();
    });

    function clear() {
        for (var r = 0; r < boardSize; r++) {
            for (var c = 0; c < boardSize; c++) {
                grid[r][c].element[0].innerHTML = '';
            }
        }
    }
}