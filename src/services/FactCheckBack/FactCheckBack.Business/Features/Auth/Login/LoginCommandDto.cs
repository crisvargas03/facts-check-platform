namespace FactCheckBack.Business.Features.Auth.Login
{
    public class LoginCommandDto
    {
        public string Email { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
    }
}