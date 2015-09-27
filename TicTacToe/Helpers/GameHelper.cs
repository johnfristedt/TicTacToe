using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TicTacToe.Models;

namespace TicTacToe.Helpers
{
    public class GameHelper
    {
        public static List<Session> ActiveSessions = new List<Session>();
        public static Guid ID { get { return Guid.NewGuid(); } set { ID = value; } }

        public static bool OutOfBounts(int row, int col, int boardSize)
        {
            if (row >= 0 && col >= 0 && row < boardSize && col < boardSize)
                return false;
            return true;
        }
    }
}