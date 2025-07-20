using FactCheckBack.Business.Features.User.UserInfoQuery;
using LiteBus.Queries.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FactCheckBack.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IQueryMediator _queryMediator;

        public UserController(IQueryMediator queryMediator)
        {
            _queryMediator = queryMediator;
        }

        [HttpGet("info")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUserInfo([FromQuery] string email)
        {
            var query = new GetUserInfoQuery(email);
            var response = await _queryMediator.QueryAsync(query);
            if (!response.IsSuccess)
            {
                return response.StatusCode switch
                {
                    System.Net.HttpStatusCode.BadRequest => BadRequest(response),
                    System.Net.HttpStatusCode.NotFound => NotFound(response),
                    _ => StatusCode((int)response.StatusCode, response)
                };
            }
            return Ok(response);
        }
    }
}
