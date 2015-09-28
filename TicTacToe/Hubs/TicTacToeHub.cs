using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using TicTacToe.Models;
using TicTacToe.Helpers;

namespace TicTacToe
{
    public class TicTacToeHub : Hub
    {
        public void NewGame(NewGame model)
        {
            var session = new Session(model.SessionName, model.BoardSize, model.WinCondition);
            session.Users.Add(Clients.Caller);
            GameManager.ActiveSessions.Add(session);

            var vm = new SessionViewModel
            {
                SessionID = session.SessionID,
                SessionName = model.SessionName,
                BoardSize = model.BoardSize
            };

            Clients.Caller.buildBoard(vm);
        }

        public void JoinGame(JoinGame model)
        {
            GameManager.ActiveSessions
                .Single(s => String.Equals(s.SessionID, model.SessionId))
                .Users
                .Add(Clients.Caller);

            var session = GameManager.ActiveSessions.Single(s => String.Equals(s.SessionID, model.SessionId));
            var vm = new SessionViewModel
            {
                SessionID = session.SessionID,
                SessionName = session.SessionName,
                BoardSize = session.Board.BoardSize
            };

            Clients.Caller.buildBoard(vm);
        }

        public void Turn(Turn model)
        {
            var users = Clients.Caller;
            var session = GameManager.ActiveSessions.Single(s => String.Equals(s.SessionID, model.SessionId));
            
            session.Board.Grid[model.Row, model.Col].Player = 1;

            GameHelper.WinCheck(model.Col, model.Row, session.Board);

            foreach (var user in session.Users)
            {
                user.turn(model.Col, model.Row);
            }
        }
    }
}