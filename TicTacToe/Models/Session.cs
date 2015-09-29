using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TicTacToe.Helpers;

namespace TicTacToe.Models
{
    public class Session
    {
        public string SessionID { get; set; }
        public string SessionName { get; set; }
        public Board Board { get; set; }
        public bool Turn { get; set; }
        public List<dynamic> Users { get; set; }

        public Session(string sessionName, int boardSize, int winCondition)
        {
            this.SessionID = Guid.NewGuid().ToString();
            this.SessionName = sessionName;
            this.Board = new Board(boardSize, winCondition);
            this.Turn = true;
            this.Users = new List<dynamic>();
        }
    }
}