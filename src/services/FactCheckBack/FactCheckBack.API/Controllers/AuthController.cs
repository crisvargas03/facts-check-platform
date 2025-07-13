using FactCheckBack.Business.Features.Auth.Login;
using FactCheckBack.Business.Features.Auth.Register;
using LiteBus.Commands.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FactCheckBack.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly ICommandMediator _commandMediator;
        public AuthController(ICommandMediator commandMediator)
        {
            _commandMediator = commandMediator;
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Login([FromBody] LoginCommand loginRequest)
        {
            var result = await _commandMediator.SendAsync(loginRequest);
            if (!result.IsSuccess)
                return BadRequest(result);
            
            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCommand registerRequest)
        {
            var result = await _commandMediator.SendAsync(registerRequest);

            return Ok(result);
        }
    }
}
