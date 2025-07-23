using FactCheckBack.Business.Features.Auth.Login;
using FactCheckBack.Business.Features.Auth.Register;
using FactCheckBack.Business.Helpers;
using FactCheckBack.Business.Services.Jwt;
using FactCheckBack.Data.Core.UnitOfWork;
using FactCheckBack.Models.Configurations;
using FactCheckBack.Models.Entities;
using LiteBus.Commands.Abstractions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace FactCheckBack.Business.Features.Article.AnalyzeArticle
{
    class AnalyzeArticleCommandHandler : ICommandHandler<AnalyzeArticleCommand, ApiResponse<AnalyzeArticleCommandDto>>
    {
        private readonly IFactCheckBackIoW _unitOfWork;

        public AnalyzeArticleCommandHandler(IFactCheckBackIoW unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ApiResponse<AnalyzeArticleCommandDto>> HandleAsync(AnalyzeArticleCommand request, CancellationToken cancellationToken = default)
        {
            try
            {
                // Get user
                var user = await _unitOfWork.Users.GetByEmailAsync(request.Email);
                if (user == null) 
                    return ApiResponse<AnalyzeArticleCommandDto>.Fail("User not found");

                // Get user_plan and plan
                var userPlan = await _unitOfWork.User_plan.GetByUserIdAsync(user.user_id);
                var plan = await _unitOfWork.Plan.GetByPlanIdAsync(userPlan!.plans_id);

                // Validate plan (expiration + attempts)
                var validationResult = ValidateUserPlan(userPlan, plan!);
                if (validationResult != null)
                    return validationResult;

                await _unitOfWork.User_plan.UpdateAsync(userPlan);
                await _unitOfWork.CompleteAsync();

                // 2. Llamar al microservicio de análisis externo
                var result = await _unitOfWork.ArticleInput.AnalyzeArticleAsync(request.Title, request.Complete_Text, "string");
                if (!result.IsSuccess)
                    return ApiResponse<AnalyzeArticleCommandDto>.Fail($"Fallo en llamada a la IA: {string.Join(" | ", result.Errors)}");

                var articleId = Guid.NewGuid().ToString();

                var article = new Article_input
                {
                    article_id = articleId,
                    user_id = user.user_id,
                    title = request.Title,
                    complete_text = request.Complete_Text,
                    created = DateTime.UtcNow,
                    article_type_id = "1-BWS5UB"
                };

                await _unitOfWork.ArticleInput.CreateAsync(article);

                var analysis = new Result
                {
                    result_id = Guid.NewGuid().ToString(),
                    article_id = articleId,
                    verdict_id = "1-EIB426",
                    created = DateTime.UtcNow,
                    percentaje_trust = result.Data.fake_rating,
                    motive = result.Data.feedback
                };

                await _unitOfWork.Result.CreateAsync(analysis);

                userPlan.attempts_used++;

                await _unitOfWork.CompleteAsync();

                var response = new AnalyzeArticleCommandDto
                {
                    Percentaje_Trust = analysis.percentaje_trust,
                    Motive = analysis.motive
                };

                return ApiResponse<AnalyzeArticleCommandDto>.Success(response);
            }
            catch (Exception ex)
            {
                var fullMessage = ex.InnerException?.Message ?? ex.Message;
                return ApiResponse<AnalyzeArticleCommandDto>.Fail("Error al analizar el articulo: " + fullMessage, HttpStatusCode.InternalServerError);
            }
        }
        private static ApiResponse<AnalyzeArticleCommandDto>? ValidateUserPlan(User_plan userPlan, Plan plan)
        {
            // Refresh plan if it expired
            userPlan = PlanValidatorService.RefreshPlanIfExpired(userPlan, plan);

            // Validate available attempts
            if (userPlan.attempts_used >= plan.max_attempts)
            {
                return ApiResponse<AnalyzeArticleCommandDto>.Fail(
                    "You have reached the maximum number of allowed article analyses for your current plan.",
                    HttpStatusCode.Forbidden
                );
            }

            return null;
        }
    }
}
