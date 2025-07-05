using FactCheckBack.Models.Configurations;
using LiteBus.Commands.Abstractions;

namespace FactCheckBack.Business.Features.Auth.Register
{
    public class RegisterCommand : ICommand<ApiResponse<RegisterCommandDto>>
    {
        public string user_id { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string name { get; set; } = string.Empty;
        public string user_type_id { get; set; } = string.Empty;
    }
}
