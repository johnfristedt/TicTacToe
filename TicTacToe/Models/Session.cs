using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicTacToe.Models
{
    public class Session
    {
        public string PlayerOne { get; set; }
        public string PlayerTwo { get; set; }
        public Board Board { get; set; }

        public Session(int boardSize, int winCondition)
        {
            this.Board = new Board(boardSize, winCondition);
        }
    }
}