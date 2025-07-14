using FactCheckBack.Business.Services.Jwt;
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
        private readonly IJwtService _jwtService;

        public LoginCommandHandler(IFactCheckBackIoW unitOfWork, IJwtService jwtService)
        {
            _unitOfWork = unitOfWork;
            _jwtService = jwtService;
        }

        public async Task<ApiResponse<LoginCommandDto>> HandleAsync(LoginCommand request, CancellationToken cancellationToken = default)
        {
            try
            {
                var dbUser = await _unitOfWork.Users.Query(false).FirstOrDefaultAsync(x => x.email.ToLower() == request.Email.ToLower(), cancellationToken);
                var validate = ValidateUserLogin(request, dbUser);

                // Generate token only if the user is valid
                if (validate != null)
                    return validate;

                var token = _jwtService.GenerateToken(dbUser!.email, "local");

                var response = new LoginCommandDto()
                {
                    Email = request.Email,
                    Token = token
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
            var isGoogleLogin = userLogin.LoginMethod?.ToLower() == "google";

            if (!isGoogleLogin)
            {
                // local user must have a valid password
                if (string.IsNullOrWhiteSpace(userFromDb!.password))
                    return ApiResponse<LoginCommandDto>.Fail("Password not set for this user", HttpStatusCode.BadRequest);

                var passwordMatch = BCrypt.Net.BCrypt.EnhancedVerify(userLogin.Password, userFromDb.password);
                if (!passwordMatch)
                    return ApiResponse<LoginCommandDto>.Fail("Email or password incorrect", HttpStatusCode.BadRequest);
            }

            return null;
        }
    }
}
