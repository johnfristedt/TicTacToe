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

            foreach (var session in GameManager.ActiveSessions.Where(s => s.Users.Count < 2))
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
            var session = GameManager.ActiveSessions.Single(s => String.Equals(s.SessionID, model.SessionId));
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
            GameManager.ActiveSessions.Add(session);

            return new SessionViewModel
            {
                SessionName = model.SessionName,
                BoardSize = model.BoardSize
            };
        }

        [HttpPost]
        [Route("turn")]
        public bool Turn([FromBody]Turn model)
        {
            var turn = GameManager.ActiveSessions.Single(s => s.SessionID == model.SessionId).Turn;
            if (model.PlayerIndex == 1)
                return turn;
            else
                return !turn;
        }
    }
}
