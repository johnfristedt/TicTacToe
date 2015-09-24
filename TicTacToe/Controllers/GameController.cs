using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TicTacToe.Models;

namespace TicTacToe.Controllers
{
    [RoutePrefix("api/game")]
    public class GameController : ApiController
    {
        [HttpPost]
        [Route("test")]
        public void Test([FromBody]Turn model)
        {
            int x = 0;
        }
    }
}
