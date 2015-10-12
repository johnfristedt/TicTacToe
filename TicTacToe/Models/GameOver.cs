using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicTacToe.Models
{
    public class GameOver
    {
        public string SessionID { get; set; }
        public int PlayerIndex { get; set; }
    }
}