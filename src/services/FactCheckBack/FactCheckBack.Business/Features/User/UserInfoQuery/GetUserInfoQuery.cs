using FactCheckBack.Models.Configurations;
using LiteBus.Queries.Abstractions;

namespace FactCheckBack.Business.Features.User.UserInfoQuery
{
    public class GetUserInfoQuery : IQuery<ApiResponse<GetUserInfoQueryDto>>
    {
        public GetUserInfoQuery(string email)
        {
            Email = email;
        }
        public string Email { get; set; } = string.Empty;
    }
}
