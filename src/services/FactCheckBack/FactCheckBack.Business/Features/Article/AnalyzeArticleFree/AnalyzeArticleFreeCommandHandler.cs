using FactCheckBack.Business.Features.Article.AnalyzeArticle;
using FactCheckBack.Data.Core.UnitOfWork;
using FactCheckBack.Models.Configurations;
using LiteBus.Commands.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FactCheckBack.Business.Features.Auth.Login;
using FactCheckBack.Business.Features.Auth.Register;
using FactCheckBack.Business.Helpers;
using FactCheckBack.Business.Services.Jwt;
using FactCheckBack.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace FactCheckBack.Business.Features.Article.AnalyzeArticleFree
{
    class AnalyzeArticleFreeCommandHandler : ICommandHandler<AnalyzeArticleFreeCommand, ApiResponse<AnalyzeArticleCommandDto>>
    {
        private readonly IFactCheckBackIoW _unitOfWork;
        public AnalyzeArticleFreeCommandHandler(IFactCheckBackIoW unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<ApiResponse<AnalyzeArticleCommandDto>> HandleAsync(AnalyzeArticleFreeCommand request, CancellationToken cancellationToken = default)
        {
            try
            {
                var effectiveTitle = string.IsNullOrWhiteSpace(request.Title)
                    ? GenerateTitle.GenerateTitleFromText(request.CompleteText)
                    : request.Title.Trim();

                // 2. Llamar al microservicio de análisis externo
                var result = await _unitOfWork.ArticleInput.AnalyzeArticleAsync(effectiveTitle, request.CompleteText, "string");
                if (!result.IsSuccess)
                    return ApiResponse<AnalyzeArticleCommandDto>.Fail($"Fallo en llamada a la IA: {string.Join(" | ", result.Errors)}");

                var response = new AnalyzeArticleCommandDto
                {
                    Motive = result.Data!.Feedback,
                    PercentageTrust = result.Data.PercentajeTrust,
                    RemainingAttempts = 10,
                    EvaluationFactors = new List<EvaluationFactorDto>
                    {
                        new EvaluationFactorDto
                        {
                            Title = "Fuente Confiable",
                            Descripcion = "Evaluación de la reputación y confiabilidad de la fuente",
                            EvaluationResult = result.Data.ReliableSource
                        },
                        new EvaluationFactorDto
                        {
                            Title = "Evidencia Científica",
                            Descripcion = "Análisis de la solidez y respaldo científico del contenido",
                            EvaluationResult = result.Data.ScientificEvidence
                        },
                        new EvaluationFactorDto
                        {
                            Title = "Citas y Referencias",
                            Descripcion = "Evaluación de la calidad y pertinencia de las fuentes citadas",
                            EvaluationResult = result.Data.CitationsAndReferences
                        },
                        new EvaluationFactorDto
                        {
                            Title = "Lenguaje Objetivo",
                            Descripcion = "Análisis de la objetividad y neutralidad del lenguaje utilizado",
                            EvaluationResult = result.Data.TargetLanguage
                        },
                        new EvaluationFactorDto
                        {
                            Title = "Contexto y Limitaciones",
                            Descripcion = "Evaluación de la contextualización y reconocimiento de limitaciones",
                            EvaluationResult = result.Data.ContextAndLimitations
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
    }
}
