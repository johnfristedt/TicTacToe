using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicTacToe.Models
{
    public class NewGame
    {
        public string SessionName { get; set; }
        public int BoardSize { get; set; }
        public int WinCondition { get; set; }
        public int Timer { get; set; }
    }
}