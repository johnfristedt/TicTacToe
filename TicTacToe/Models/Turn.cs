using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicTacToe.Models
{
    public class Turn
    {
        public string SessionId { get; set; }
        public int PlayerIndex { get; set; }
        public int Row { get; set; }
        public int Col { get; set; }
    }
}