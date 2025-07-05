using FactCheckBack.Data.Core.Exceptions;
using FactCheckBack.Data.Core.UnitOfWork;
using FactCheckBack.Models.Configurations;
using FactCheckBack.Models.Entities;
using LiteBus.Commands.Abstractions;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace FactCheckBack.Business.Features.Auth.Login
{
    public class LoginCommandHandler : ICommandHandler<LoginCommand, ApiResponse<LoginCommandDto>>
    {
        private readonly IFactCheckBackIoW _unitOfWork;

        public LoginCommandHandler(IFactCheckBackIoW unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ApiResponse<LoginCommandDto>> HandleAsync(LoginCommand request, CancellationToken cancellationToken = default)
        {
            try
            {
                var dbUser = await _unitOfWork.Users.Query(false).FirstOrDefaultAsync(x => x.email == request.Email);
                var validate = ValidateUserLogin(request, dbUser);

                // TODO: finish the login logic, the jwt token generation, etc.
                var response = new LoginCommandDto()
                {
                    Email = request.Email,
                    Token = "dummy_token"
                };

                return ApiResponse<LoginCommandDto>.Success(response);
            }
            catch (DataException ex)
            {
                return ApiResponse<LoginCommandDto>.Fail(ex.Message, HttpStatusCode.InternalServerError);
            }
            catch (Exception ex)
            {
                return ApiResponse<LoginCommandDto>.Fail(ex.Message, HttpStatusCode.InternalServerError);
            }
        }

        private static ApiResponse<LoginCommandDto>? ValidateUserLogin(LoginCommand userLogin, Users? userFromDb)
        {
            if (userFromDb is null)
                return ApiResponse<LoginCommandDto>.Fail("Email or Password incorrect", HttpStatusCode.BadRequest);

            var passwordMatch = BCrypt.Net.BCrypt.EnhancedVerify(userLogin.Password, userFromDb.password);
            if (!passwordMatch)
                return ApiResponse<LoginCommandDto>.Fail("Email or Password incorrect", HttpStatusCode.BadRequest);
            
            return null;
        }
    }
}
