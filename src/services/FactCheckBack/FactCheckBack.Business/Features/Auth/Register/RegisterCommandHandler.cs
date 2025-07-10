using FactCheckBack.Business.Features.Auth.Login;
using FactCheckBack.Business.Services.Jwt;
using FactCheckBack.Data.Core.Interfaces;
using FactCheckBack.Data.Core.UnitOfWork;
using FactCheckBack.Models.Configurations;
using FactCheckBack.Models.Entities;
using LiteBus.Commands.Abstractions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Numerics;

namespace FactCheckBack.Business.Features.Auth.Register
{
    public class RegisterCommandHandler : ICommandHandler<RegisterCommand, ApiResponse<RegisterCommandDto>>
    {
        private readonly IFactCheckBackIoW _unitOfWork;
        private readonly IUserRepository _userRepository;
        private readonly IUserPlanRepository _userPlanRepository;
        private readonly IJwtService _jwtService;

        public RegisterCommandHandler(IFactCheckBackIoW unitOfWork, IUserRepository userRepository, IUserPlanRepository userPlanRepository, IJwtService jwtService)
        {
            _unitOfWork = unitOfWork;
            _userRepository = userRepository;
            _userPlanRepository = userPlanRepository;
            _jwtService = jwtService;
        }

        public async Task<ApiResponse<RegisterCommandDto>> HandleAsync(RegisterCommand request, CancellationToken cancellationToken = default)
        {
            try
            {
                var freePlan = await _unitOfWork.Plan.Query().FirstOrDefaultAsync(p => p.plan_type_id == "1-UU2FNQ", cancellationToken);
                var dbUser = await _unitOfWork.Users.Query(false).FirstOrDefaultAsync(u => u.email.ToLower() == request.Email.ToLower(), cancellationToken);
                var validation = ValidateUserRegistration(request, dbUser, freePlan);

                // Create User only if the user is valid
                if (validation != null)
                    return validation;

                var newUser = new Users
                {
                    user_id = "",
                    email = request.Email,
                    name = request.name,
                    created = DateTime.UtcNow,
                    user_type_id = "1",
                    password = BCrypt.Net.BCrypt.EnhancedHashPassword(request.Password)
                };

                await _userRepository.CreateAsync(newUser);
                await _unitOfWork.CompleteAsync();

                // In addition, we create a User_plan record only if the user is valid and the free plan exists.
                dbUser = await _unitOfWork.Users.Query(false).FirstOrDefaultAsync(u => u.email.ToLower() == request.Email.ToLower(), cancellationToken);
                var startDate = DateTime.UtcNow;
                var endDate = freePlan!.period_type switch
                {
                    "day" => startDate.AddDays(freePlan.duration),
                    "month" => startDate.AddMonths(freePlan.duration),
                    "year" => startDate.AddYears(freePlan.duration),
                    _ => throw new Exception("Period type not supported for the plan")
                };

                var userPlan = new User_plan
                {
                    user_id = dbUser!.user_id,
                    plans_id = freePlan.plans_id,
                    start_date_agreement = startDate,
                    end_date_agreement = endDate,
                    attempts_used = 0
                };

                await _userPlanRepository.CreateAsync(userPlan);
                await _unitOfWork.CompleteAsync();

                // Generate token
                var token = _jwtService.GenerateToken(newUser.email, "local");

                var response = new RegisterCommandDto
                {
                    Email = newUser.email,
                    Token = token
                };

                return ApiResponse<RegisterCommandDto>.Success(response);
            }
            catch (Exception ex)
            {
                //return ApiResponse<RegisterCommandDto>.Fail("Error al registrar el usuario: " + ex.Message, HttpStatusCode.InternalServerError);
                var fullMessage = ex.InnerException?.Message ?? ex.Message;
                return ApiResponse<RegisterCommandDto>.Fail("Error al registrar el usuario: " + fullMessage, HttpStatusCode.InternalServerError);
            }
        }

        private static ApiResponse<RegisterCommandDto>? ValidateUserRegistration(RegisterCommand userRegister, Users? userFromDb, Plan? freePLanFromDb)
        {
            if (freePLanFromDb is null)
                return ApiResponse<RegisterCommandDto>.Fail("No free plan found", HttpStatusCode.BadRequest);

            if (userFromDb is not null)
                return ApiResponse<RegisterCommandDto>.Fail("The email is already registered.", HttpStatusCode.BadRequest);

            if (string.IsNullOrWhiteSpace(userRegister.Email) || !userRegister.Email.Contains("@"))
                return ApiResponse<RegisterCommandDto>.Fail("Invalid email", HttpStatusCode.BadRequest);

            if (string.IsNullOrWhiteSpace(userRegister.Password) || userRegister.Password.Length < 8)
                return ApiResponse<RegisterCommandDto>.Fail("The password must be at least 8 characters", HttpStatusCode.BadRequest);

            if (string.IsNullOrWhiteSpace(userRegister.name))
                return ApiResponse<RegisterCommandDto>.Fail("Username is required", HttpStatusCode.BadRequest);

            return null;
        }
    }
}
