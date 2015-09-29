using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicTacToe.Models
{
    public class SessionViewModel
    {
        public string SessionID { get; set; }
        public string SessionName { get; set; }
        public int PlayerIndex { get; set; }
        public int BoardSize { get; set; }
    }
}