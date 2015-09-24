using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicTacToe.Models
{
    public class Node
    {
        public int Player { get; set; }
        public int Row { get; set; }
        public int Col { get; set; }
        public List<Node> Neighbours { get; set; }
    }
}