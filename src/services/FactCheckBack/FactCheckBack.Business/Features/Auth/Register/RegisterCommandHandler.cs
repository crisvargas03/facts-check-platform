using FactCheckBack.Business.Helpers;
using FactCheckBack.Business.Services.Jwt;
using FactCheckBack.Data.Core.UnitOfWork;
using FactCheckBack.Models.Configurations;
using FactCheckBack.Models.Entities;
using LiteBus.Commands.Abstractions;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace FactCheckBack.Business.Features.Auth.Register
{
    public class RegisterCommandHandler : ICommandHandler<RegisterCommand, ApiResponse<RegisterCommandDto>>
    {
        private readonly IFactCheckBackIoW _unitOfWork;
        private readonly IJwtService _jwtService;

        public RegisterCommandHandler(IFactCheckBackIoW unitOfWork, IJwtService jwtService)
        {
            _unitOfWork = unitOfWork;
            _jwtService = jwtService;
        }

        public async Task<ApiResponse<RegisterCommandDto>> HandleAsync(RegisterCommand request, CancellationToken cancellationToken = default)
        {
            try
            {
                var freePlan = await _unitOfWork.Plan.Query(false)
                    .FirstOrDefaultAsync(p => p.plan_type_id == "1-UU2FNQ", cancellationToken);
                
                var dbUser = await _unitOfWork.Users.Query(false)
                    .FirstOrDefaultAsync(u => u.email.ToLower() == request.Email.ToLower(), cancellationToken);
                
                var validation = ValidateUserRegistration(request, dbUser, freePlan);
                if (validation != null)
                    return validation;

                var isGoogleUser = request.RegistrationMethod?.ToLower() == "google";

                var userId = Guid.NewGuid().ToString();
                var newUser = new Users
                {
                    user_id = userId,
                    email = request.Email,
                    name = request.name,
                    created = DateTime.UtcNow,
                    user_type_id = "1",
                    password = isGoogleUser ? null : BCrypt.Net.BCrypt.EnhancedHashPassword(request.Password)
                };

                await _unitOfWork.Users.CreateAsync(newUser);

                // In addition, we create a User_plan record only if the user is valid and the free plan exists.
                var userPlan = SetUserPlan(newUser, freePlan!);

                await _unitOfWork.User_plan.CreateAsync(userPlan);
                await _unitOfWork.CompleteAsync();

                var response = new RegisterCommandDto
                {
                    Email = newUser.email,
                    Name = newUser.name,
                    Token = _jwtService.GenerateToken(newUser.email, "local")
                };

                return ApiResponse<RegisterCommandDto>.Success(response);
            }
            catch (Exception ex)
            {
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

            if (string.IsNullOrWhiteSpace(userRegister.Email) || !userRegister.Email.Contains('@'))
                return ApiResponse<RegisterCommandDto>.Fail("Invalid email", HttpStatusCode.BadRequest);

            if (userRegister.RegistrationMethod.ToLower() == "local" & (string.IsNullOrWhiteSpace(userRegister.Password) || userRegister.Password.Length < 8))
                return ApiResponse<RegisterCommandDto>.Fail("The password must be at least 8 characters", HttpStatusCode.BadRequest);

            if (string.IsNullOrWhiteSpace(userRegister.name))
                return ApiResponse<RegisterCommandDto>.Fail("Username is required", HttpStatusCode.BadRequest);

            return null;
        }

        private static User_plan SetUserPlan(Users user, Plan plan)
        {
            return new User_plan
            {
                user_id = user.user_id,
                plans_id = plan.plans_id,
                start_date_agreement = user.created,
                end_date_agreement = PlanPeriodDates.GetPlanEndDate(plan.period_type, plan.duration),
                attempts_used = 0
            };
        }
    }
}
