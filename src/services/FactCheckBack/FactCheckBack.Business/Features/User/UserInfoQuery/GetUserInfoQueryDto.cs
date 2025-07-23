namespace FactCheckBack.Business.Features.User.UserInfoQuery
{
    public class GetUserInfoQueryDto
    {
        public string Id { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? AvatarUrl { get; set; } = null;
    }
}
