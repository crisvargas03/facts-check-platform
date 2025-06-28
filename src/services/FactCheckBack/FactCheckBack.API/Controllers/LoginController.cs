using FactCheckBack.Business.Services.Authorization;
using FactCheckBack.Models.Auth;
using Microsoft.AspNetCore.Mvc;

namespace FactCheckBack.API.Controllers
{
    [Route("api/authorization")]
    [ApiController]
    public class LoginController : Controller
    {
        private readonly IAuthService _authService;

        public LoginController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(AuthRequest request)
        {
            var result = await _authService.LoginAsync(request);
            return Ok(result);
        }
    }
}
