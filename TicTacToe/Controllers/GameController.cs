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
        GameManager game = new GameManager();

        [HttpGet]
        [Route("sessions")]
        public SessionViewModel[] Sessions()
        {
            //if (GameHelper.ActiveSessions.Count < 2)
            //    GameHelper.ActiveSessions.Add(new Session("Test", 3, 3));

            var sessions = new List<SessionViewModel>();

            foreach (var session in GameHelper.ActiveSessions)
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
            var session = GameHelper.ActiveSessions.Single(s => String.Equals(s.SessionID, model.SessionId));
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
            var session = new Session(model.SessionName, model.BoardSize, model.WinCondition);
            GameHelper.ActiveSessions.Add(session);

            return new SessionViewModel
            {
                SessionName = model.SessionName,
                BoardSize = model.BoardSize
            };
        }
    }
}
