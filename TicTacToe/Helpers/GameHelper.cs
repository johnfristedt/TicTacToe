using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TicTacToe.Models;

namespace TicTacToe.Helpers
{
    public class GameHelper
    {
        public static Guid ID { get { return Guid.NewGuid(); } set { ID = value; } }

        public static bool OutOfBounts(int row, int col, int boardSize)
        {
            if (row >= 0 && col >= 0 && row < boardSize && col < boardSize)
                return false;
            return true;
        }

        public static int WinCheck(int col, int row, Board board)
        {
            var currentNode = board.Grid[row, col];

            for (int i = 0; i < currentNode.Neighbours.Count; i++)
            {
                var currentNeighbour = currentNode.Neighbours[i];
                if (currentNeighbour.Player == currentNode.Player)
                {
                    var streak = 2;
                    while (true)
                    {
                        var nextRow = (currentNeighbour.Row - currentNode.Row) + currentNeighbour.Row;
                        var nextCol = (currentNeighbour.Col - currentNode.Col) + currentNeighbour.Col;

                        if (!GameHelper.OutOfBounts(nextRow, nextCol, board.BoardSize))
                        {
                            currentNode = currentNeighbour;
                            currentNeighbour = board.Grid[nextRow, nextCol];

                            if (currentNeighbour.Player == currentNode.Player)
                                streak++;
                            else
                                break;

                            if (streak == board.WinCondition)
                            {
                                return currentNode.Player;
                            }
                        }
                        else
                            break;
                    }
                }
                currentNode = board.Grid[row, col];
            }

            return 0;
        }
    }
}