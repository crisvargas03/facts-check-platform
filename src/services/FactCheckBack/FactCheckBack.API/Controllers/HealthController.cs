using LiteBus.Commands.Abstractions;
using Microsoft.AspNetCore.Mvc;
using FactCheckBack.Business.Features.Heath.Command;

namespace FactCheckBack.API.Controllers
{
    [Route("api/health")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        private readonly ICommandMediator _commandMediator;

        public HealthController(ICommandMediator commandMediator)
        {
            _commandMediator = commandMediator;
        }

        [HttpGet("check")]
        public async Task<IActionResult> Check()
        {
            var result = await _commandMediator.SendAsync(new CheckHealthCommand());
            return Ok(result);
        }
    }
}
