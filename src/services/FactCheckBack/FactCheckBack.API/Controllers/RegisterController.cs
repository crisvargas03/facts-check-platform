using FactCheckBack.Business.Services.Authorization;
using FactCheckBack.Models.Auth;
using Microsoft.AspNetCore.Mvc;

namespace FactCheckBack.API.Controllers
{
    [Route("api/authorization")]
    [ApiController]
    public class RegisterController : Controller
    {
        private readonly IAuthService _authService;

        public RegisterController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(AuthRequest request)
        {
            var result = await _authService.RegisterAsync(request);
            return Ok(result);
        }
    }
}
