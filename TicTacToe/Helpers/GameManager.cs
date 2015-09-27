using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TicTacToe.Models;

namespace TicTacToe.Helpers
{
    public class GameManager
    {
        public List<Session> ActiveSessions { get; set; }

        public GameManager()
        {
            this.ActiveSessions = new List<Session>();
        }
    }
}