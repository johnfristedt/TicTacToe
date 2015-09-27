using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace TicTacToe
{
    public class TicTacToeHub : Hub
    {
        public void Send(int row, int col)
        {
            Clients.All.broadcastMessage(col, row);
        }
    }
}