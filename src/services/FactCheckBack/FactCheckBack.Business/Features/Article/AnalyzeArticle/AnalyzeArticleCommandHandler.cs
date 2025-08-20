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

                var effectiveTitle = string.IsNullOrWhiteSpace(request.Title)
                    ? GenerateTitle.GenerateTitleFromText(request.CompleteText)
                    : request.Title.Trim();

                // 2. Llamar al microservicio de análisis externo
                var result = await _unitOfWork.ArticleInput.AnalyzeArticleAsync(effectiveTitle, request.CompleteText, "string");
                if (!result.IsSuccess || result.Data == null)
                    return ApiResponse<AnalyzeArticleCommandDto>.Fail($"Fallo en llamada a la IA: {string.Join(" | ", result.Errors)}");

                var articleId = Guid.NewGuid().ToString();

                var article = new Article_input
                {
                    article_id = articleId,
                    user_id = user.user_id,
                    title = effectiveTitle,
                    complete_text = request.CompleteText,
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
                    percentaje_trust = result.Data.PercentajeTrust,
                    motive = result.Data.Feedback,
                    reliable_source = result.Data.ReliableSource,
                    scientific_evidence = result.Data.ScientificEvidence,
                    citations_and_references  =result.Data.CitationsAndReferences,
                    target_language = result.Data.TargetLanguage,
                    context_and_limitations = result.Data.ContextAndLimitations
                };

                await _unitOfWork.Results.CreateAsync(analysis);

                userPlan.attempts_used++;

                decimal RemainingAttempts = plan!.max_attempts - userPlan.attempts_used;

                await _unitOfWork.CompleteAsync();

                var response = new AnalyzeArticleCommandDto
                {
                    Motive = analysis.motive,
                    PercentageTrust = analysis.percentaje_trust,
                    RemainingAttempts = RemainingAttempts,
                    EvaluationFactors = new List<EvaluationFactorDto>
                    {
                        new EvaluationFactorDto
                        {
                            Title = "Fuente Confiable",
                            Descripcion = "Evaluación de la reputación y confiabilidad de la fuente",
                            EvaluationResult = analysis.reliable_source
                        },
                        new EvaluationFactorDto
                        {
                            Title = "Evidencia Científica",
                            Descripcion = "Análisis de la solidez y respaldo científico del contenido",
                            EvaluationResult = analysis.scientific_evidence
                        },
                        new EvaluationFactorDto
                        {
                            Title = "Citas y Referencias",
                            Descripcion = "Evaluación de la calidad y pertinencia de las fuentes citadas",
                            EvaluationResult = analysis.citations_and_references
                        },
                        new EvaluationFactorDto
                        {
                            Title = "Lenguaje Objetivo",
                            Descripcion = "Análisis de la objetividad y neutralidad del lenguaje utilizado",
                            EvaluationResult = analysis.target_language
                        },
                        new EvaluationFactorDto
                        {
                            Title = "Contexto y Limitaciones",
                            Descripcion = "Evaluación de la contextualización y reconocimiento de limitaciones",
                            EvaluationResult = analysis.context_and_limitations
                        }
                    }
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
