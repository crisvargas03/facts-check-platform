using FactCheckBack.Data.Core.UnitOfWork;
using FactCheckBack.Models.Configurations;
using LiteBus.Commands.Abstractions;

namespace FactCheckBack.Business.Features.Auth.Register
{
    public class RegisterCommandHandler : ICommandHandler<RegisterCommand, ApiResponse<RegisterCommandDto>>
    {
        private readonly IFactCheckBackIoW _unitOfWork;

        public RegisterCommandHandler(IFactCheckBackIoW unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public Task<ApiResponse<RegisterCommandDto>> HandleAsync(RegisterCommand message, CancellationToken cancellationToken = default)
        {
            // TODO: Implement the registration logic here.
            // Tip: check the logic in LoginCommandHandler for reference.
            // TODO: When finished, remove the Models/Auth folder and the Business/Services/Authorization folder.
            throw new NotImplementedException("This method needs to be implemented.");
        }

        private static ApiResponse<RegisterCommandDto>? ValidateUserRegistration(RegisterCommand userRegister)
        {
            if (string.IsNullOrWhiteSpace(userRegister.Password) || userRegister.Password.Length < 8)
                return ApiResponse<RegisterCommandDto>.Fail("Password too short");
            if (string.IsNullOrWhiteSpace(userRegister.Email))
                return ApiResponse<RegisterCommandDto>.Fail("Email is required");
            return null;
        }
    }
}
