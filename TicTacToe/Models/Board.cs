using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TicTacToe.Helpers;

namespace TicTacToe.Models
{
    public class Board
    {
        public int BoardSize { get; set; }
        public int WinCondition { get; set; }
        public int Timer { get; set; }
        public Node[,] Grid { get; set; }

        /// <summary>
        /// New game board
        /// </summary>
        /// <param name="boardSize">Number of rows and columns</param>
        /// <param name="winCondition">How many in a row to win</param>
        public Board(int boardSize, int winCondition, int timer)
        {
            this.BoardSize = boardSize;
            this.WinCondition = winCondition;
            this.Timer = timer;
            this.Grid = new Node[this.BoardSize, this.BoardSize];

            Initialize();
        }

        private void Initialize()
        {
            for (int r = 0; r < BoardSize; r++)
                for (int c = 0; c < BoardSize; c++)
                    Grid[r, c] = new Node { Player = 0, Row = r, Col = c, Neighbours = new List<Node>() };

            for (int nodeRow = 0; nodeRow < BoardSize; nodeRow++)
                for (int nodeCol = 0; nodeCol < BoardSize; nodeCol++)
                    for (int r = 0; r < 3; r++)
                        for (int c = 0; c < 3; c++)
                        {
                            int neighbourRow = nodeRow + (-1 + r);
                            int neighbourCol = nodeCol + (-1 + c);

                            if (neighbourRow == nodeRow && neighbourCol == nodeCol)
                                continue;

                            if (!GameHelper.OutOfBounts(neighbourRow, neighbourCol, BoardSize))
                                Grid[nodeRow, nodeCol].Neighbours.Add(Grid[neighbourRow, neighbourCol]);
                        }
        }
    }
}