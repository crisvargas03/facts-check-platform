using FactCheckBack.Business.Features.Plans.PricingQuery;
using FactCheckBack.Data.Core.UnitOfWork;
using FactCheckBack.Models.Configurations;
using LiteBus.Queries.Abstractions;

namespace FactCheckBack.Business.Features.User.UserInfoQuery
{
    public class GetUserInfoQueryHandler : IQueryHandler<GetUserInfoQuery, ApiResponse<GetUserInfoQueryDto>>
    {
        private readonly IFactCheckBackIoW _unitOfWork;

        public GetUserInfoQueryHandler(IFactCheckBackIoW unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<ApiResponse<GetUserInfoQueryDto>> HandleAsync(GetUserInfoQuery request, CancellationToken cancellationToken = default)
        {
            try
            {
                if (request.Email is null)
                    return ApiResponse<GetUserInfoQueryDto>
                        .Fail("Email is required", System.Net.HttpStatusCode.BadRequest, null);

                var user = await _unitOfWork.Users.GetByEmailAsync(request.Email);
                if (user is null)
                    return ApiResponse<GetUserInfoQueryDto>
                        .Fail("User not found", System.Net.HttpStatusCode.NotFound, null);

                var userDto = new GetUserInfoQueryDto
                {
                    Id = user.user_id,
                    Email = user.email,
                    Name = user.name,
                    AvatarUrl = null // Assuming AvatarUrl is not available in the user object  
                };

                return ApiResponse<GetUserInfoQueryDto>.Success(userDto);

            }
            catch (Exception ex)
            {
                return ApiResponse<GetUserInfoQueryDto>.Fail(ex.Message, System.Net.HttpStatusCode.InternalServerError);
            }
        }
    }
}
