/// <reference path="jquery-2.1.4.js" />
/// <reference path="jqueryui/jquery-ui.js" />

var grid;

//buildBoard({ BoardSize: 3 })

//$.widget('tictactoe.progressbar', {
//    options: {
//        value: 0
//    },
//    _create: function () {
//        var progress = this.options.value + ' sec';
//        this.element
//            .addClass('progressbar')
//            .text(progress);
//    },
//    value: function (value) {
//        if (value === undefined) {
//            return this.options.value;
//        }
//        this.options.value = this._constrain(value);
//        var progress = this.options.value + ' sec';
//        this.element.text(progress);
//    },
//    _constrain: function (value) {
//        if (value > 100) {
//            value = 100;
//        }
//        if (value < 0) {
//            value = 0;
//        }
//        return value;
//    }
//});

$('#progressbar1').progressbar({ value: 30, max: 30 });
$('#progressbar2').progressbar({ value: 30, max: 30 });

//$('<div></div>')
//    .appendTo('#progressbars')
//    .progressbar({ value: 20 });


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