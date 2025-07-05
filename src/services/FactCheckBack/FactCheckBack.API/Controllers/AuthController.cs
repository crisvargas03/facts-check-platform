using FactCheckBack.Business.Features.Auth.Login;
using FactCheckBack.Business.Features.Auth.Register;
using LiteBus.Commands.Abstractions;
using Microsoft.AspNetCore.Mvc;

namespace FactCheckBack.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ICommandMediator _commandMediator;
        public AuthController(ICommandMediator commandMediator)
        {
            _commandMediator = commandMediator;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommand loginRequest)
        {
            var result = await _commandMediator.SendAsync(loginRequest);

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
