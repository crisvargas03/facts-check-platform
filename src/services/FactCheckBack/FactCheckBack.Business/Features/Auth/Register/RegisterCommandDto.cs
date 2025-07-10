namespace FactCheckBack.Business.Features.Auth.Register
{
    public class RegisterCommandDto
    {
        public string Email { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
    }
}