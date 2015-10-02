﻿using System;
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
            Clients.Others.addSession(vm);
        }

        public void JoinGame(JoinGame model)
        {
            GameManager.ActiveSessions
                .Single(s => String.Equals(s.SessionID, model.SessionID))
                .Users
                .Add(Clients.Caller);

            var session = GameHelper.GetSession(model.SessionID);
            var vm = new SessionViewModel
            {
                SessionID = session.SessionID,
                SessionName = session.SessionName,
                PlayerIndex = 2,
                BoardSize = session.Board.BoardSize
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
                Clients.All.RemoveSession(model.SessionID);
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
                        if (playerWin != 0)
                        {
                            user.gameOver(playerWin);
                        }

                        user.turn(model.Col, model.Row, session.Turn);
                    }

                    if (playerWin != 0) session.GameOver = true;
                    else session.Turn = !session.Turn;
                }
            }
        }
    }
}