using FactCheckBack.Models.Configurations;
using LiteBus.Commands.Abstractions;

namespace FactCheckBack.Business.Features.Auth.Login
{
    public class LoginCommand : ICommand<ApiResponse<LoginCommandDto>>
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
