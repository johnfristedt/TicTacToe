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
            var session = new Session(model.SessionName, model.BoardSize, model.WinCondition, model.Timer);
            session.Users.Add(Clients.Caller);
            GameManager.ActiveSessions.Add(session);

            var vm = new SessionViewModel
            {
                SessionID = session.SessionID,
                SessionName = model.SessionName,
                PlayerIndex = 1,
                BoardSize = model.BoardSize,
                Timer = model.Timer
            };

            Clients.Caller.buildBoard(vm);
            vm.PlayerIndex = 0;
            Clients.Others.addSession(vm);
        }

        public void JoinGame(JoinGame model)
        {
            GameHelper.AddUserToSession(model.SessionID, Clients.Caller);
            var session = GameHelper.GetSession(model.SessionID);

            var vm = new SessionViewModel
            {
                SessionID = session.SessionID,
                SessionName = session.SessionName,
                PlayerIndex = 2,
                BoardSize = session.Board.BoardSize,
                Timer = session.Board.Timer
            };

            Clients.Caller.buildBoard(vm);
        }

        public void LeaveGame(LeaveGame model)
        {
            var session = GameHelper.GetSession(model.SessionID);
            if (!session.GameOver)
            {
                session.GameOver = true;
                session.Users.Remove(Clients.Caller);
                Clients.All.removeSession(model.SessionID);
            }
        }

        public void Turn(Turn model)
        {
            var session = GameHelper.GetSession(model.SessionID);

            if (((session.Turn && model.PlayerIndex == 1) || (!session.Turn && model.PlayerIndex == 2)) && !session.GameOver)
            {
                if (session.Board.Grid[model.Row, model.Col].Player == 0)
                {
                    session.Board.Grid[model.Row, model.Col].Player = model.PlayerIndex;

                    var playerWin = GameHelper.WinCheck(model.Col, model.Row, session.Board);
                    foreach (var user in session.Users)
                    {
                        user.turn(model.Col, model.Row, session.Turn);

                        if (playerWin != 0)
                        {
                            user.gameOver(String.Format("Player {0} has won!", model.PlayerIndex));
                        }
                    }

                    if (playerWin != 0)
                    {
                        session.GameOver = true;
                        Clients.All.removeSession(session.SessionID);
                    }
                    else session.Turn = !session.Turn;
                }
            }
        }

        public void OutOfTime(GameOver model)
        {
            var session = GameHelper.GetSession(model.SessionID);
            foreach (var user in session.Users)
            {
                user.gameOver(String.Format("Player {0} ran out of time!", model.PlayerIndex));
                this.LeaveGame(new LeaveGame { SessionID = model.SessionID });
            }
        }
    }
}