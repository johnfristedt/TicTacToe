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
                PlayerIndex = 1,
                BoardSize = model.BoardSize
            };

            Clients.Caller.buildBoard(vm);
            vm.PlayerIndex = 0;
            Clients.All.addSession(vm);
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
                PlayerIndex = 2,
                BoardSize = session.Board.BoardSize
            };

            Clients.Caller.buildBoard(vm);
        }

        public void Turn(Turn model)
        {
            var users = Clients.Caller;
            var session = GameManager.ActiveSessions.Single(s => String.Equals(s.SessionID, model.SessionId));

            if ((session.Turn && model.PlayerIndex == 1) || (!session.Turn && model.PlayerIndex == 2))
            {
                session.Board.Grid[model.Row, model.Col].Player = model.PlayerIndex;

                var playerWin = GameHelper.WinCheck(model.Col, model.Row, session.Board);
                foreach (var user in session.Users)
                {
                    if (playerWin != 0)
                    {
                        user.gameOver(playerWin);
                    }

                    user.turn(model.Col, model.Row, session.Turn);
                }

                if (playerWin != 0) GameManager.ActiveSessions.Remove(session);
                else session.Turn = !session.Turn;
            }
        }
    }
}