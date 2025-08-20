using FactCheckBack.Models.Configurations;
using LiteBus.Commands.Abstractions;

namespace FactCheckBack.Business.Features.Auth.Register
{
    public class RegisterCommand : ICommand<ApiResponse<RegisterCommandDto>>
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string name { get; set; } = string.Empty;
        public string RegistrationMethod { get; set; } = string.Empty;
    }
}
