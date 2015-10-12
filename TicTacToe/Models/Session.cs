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
        public bool GameOver { get; set; }
        public List<dynamic> Users { get; set; }

        public Session(string sessionName, int boardSize, int winCondition, int timer)
        {
            this.SessionID = Guid.NewGuid().ToString();
            this.SessionName = sessionName;
            this.Board = new Board(boardSize, winCondition, timer);
            this.Turn = true;
            this.GameOver = false;
            this.Users = new List<dynamic>();
        }
    }
}