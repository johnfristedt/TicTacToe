using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TicTacToe.Helpers;
using TicTacToe.Models;

namespace TicTacToe.Controllers
{
    [RoutePrefix("api/game")]
    public class GameController : ApiController
    {
        [HttpGet]
        [Route("sessions")]
        public SessionViewModel[] Sessions()
        {
            //if (GameManager.ActiveSessions.Count < 2)
            //    GameManager.ActiveSessions.Add(new Session("Test", 3, 3));

            var sessions = new List<SessionViewModel>();

            foreach (var session in GameHelper.GetLobbySessions())
            {
                sessions.Add(new SessionViewModel
                {
                    SessionID = session.SessionID,
                    SessionName = session.SessionName,
                    BoardSize = session.Board.BoardSize
                });
            }

            return sessions.ToArray();
        }

        [HttpPost]
        [Route("join")]
        public SessionViewModel Join([FromBody]JoinGame model)
        {
            var session = GameHelper.GetSession(model.SessionID);
            var vm = new SessionViewModel
            {
                SessionID = session.SessionID,
                SessionName = session.SessionName,
                BoardSize = session.Board.BoardSize
            };

            return vm;
        }

        [HttpPost]
        [Route("new")]
        public object New([FromBody]NewGame model)
        {
            GameHelper.AddSession(new Session(model.SessionName,
                                              model.BoardSize,
                                              model.WinCondition,
                                              model.Timer));

            return new SessionViewModel
            {
                SessionName = model.SessionName,
                BoardSize = model.BoardSize
            };
        }
    }
}
