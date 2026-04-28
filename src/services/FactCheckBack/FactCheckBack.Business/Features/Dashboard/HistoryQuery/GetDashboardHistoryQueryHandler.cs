using FactCheckBack.Business.Features.Article.AnalyzeArticle;
using FactCheckBack.Data.Core.UnitOfWork;
using FactCheckBack.Models.Configurations;
using LiteBus.Queries.Abstractions;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace FactCheckBack.Business.Features.Dashboard.HistoryQuery
{
    public class GetDashboardHistoryQueryHandler(IFactCheckBackIoW unitOfWork) : IQueryHandler<GetDashboardHistoryQuery,
        ApiResponse<GetDashboardHistoryQueryDto>>
    {
        public async Task<ApiResponse<GetDashboardHistoryQueryDto>> HandleAsync(GetDashboardHistoryQuery request,
            CancellationToken cancellationToken = default)
        {
            try
            {
                if (!await unitOfWork.CanConnectAsync())
                    return ApiResponse<GetDashboardHistoryQueryDto>.Fail("No se puede conectar a la base de datos",
                        HttpStatusCode.ServiceUnavailable);

                if (string.IsNullOrWhiteSpace(request.User))
                    return ApiResponse<GetDashboardHistoryQueryDto>.Fail(
                        "Usuario requerido.",
                        HttpStatusCode.BadRequest);

                var user = await unitOfWork.Users.Query(false)
                    .FirstOrDefaultAsync(u => u.email == request.User || u.user_id == request.User, cancellationToken);

                if (user is null)
                    return ApiResponse<GetDashboardHistoryQueryDto>.Fail(
                        "No fueron encontrados datos para este usuario.",
                        HttpStatusCode.BadRequest);

                var baseQuery = unitOfWork.Results.Query(false)
                    .Where(r => r.Article_input.user_id == user.user_id);

                if (request.StartDate.HasValue)
                {
                    var startDateUtc = request.StartDate.Value.ToUniversalTime();
                    baseQuery = baseQuery.Where(r => r.created.Date >= startDateUtc.Date);
                }

                if (request.EndDate.HasValue)
                {
                    var endDateUtc = request.EndDate.Value.ToUniversalTime();
                    baseQuery = baseQuery.Where(r => r.created.Date <= endDateUtc.Date);
                }

                var totalItems = await baseQuery.CountAsync(cancellationToken);

                var items = await baseQuery
                    .Include(r => r.Article_input)
                    .OrderByDescending(r => r.created)
                    .Skip((request.Page - 1) * request.PageSize)
                    .Take(request.PageSize)
                    .Select(r => new HistoryItemDto
                    {
                        Id = r.result_id,
                        ArticleName = r.Article_input.title,
                        Credibility = r.percentaje_trust,
                        AnalysisDate = r.created,
                        Summary = r.motive,
                        EvaluationFactors = new List<EvaluationFactorDto>
                    {
                        new EvaluationFactorDto
                        {
                            Title = "Fuente Confiable",
                            Descripcion = "Evaluación de la reputación y confiabilidad de la fuente",
                            EvaluationResult = r.reliable_source
                        },
                        new EvaluationFactorDto
                        {
                            Title = "Evidencia Científica",
                            Descripcion = "Análisis de la solidez y respaldo científico del contenido",
                            EvaluationResult = r.scientific_evidence
                        },
                        new EvaluationFactorDto
                        {
                            Title = "Citas y Referencias",
                            Descripcion = "Evaluación de la calidad y pertinencia de las fuentes citadas",
                            EvaluationResult = r.citations_and_references
                        },
                        new EvaluationFactorDto
                        {
                            Title = "Lenguaje Objetivo",
                            Descripcion = "Análisis de la objetividad y neutralidad del lenguaje utilizado",
                            EvaluationResult = r.target_language
                        },
                        new EvaluationFactorDto
                        {
                            Title = "Contexto y Limitaciones",
                            Descripcion = "Evaluación de la contextualización y reconocimiento de limitaciones",
                            EvaluationResult = r.context_and_limitations
                        }
                    }
                    })
                    .ToListAsync(cancellationToken);
                var totalPages = (int)Math.Ceiling((double)totalItems / request.PageSize);

                return ApiResponse<GetDashboardHistoryQueryDto>.Success(new GetDashboardHistoryQueryDto
                {
                    Items = items,
                    Pagination = new PaginationDto
                    {
                        CurrentPage = request.Page,
                        TotalPages = totalPages,
                        TotalItems = totalItems,
                        PageSize = request.PageSize
                    }
                });
            }
            catch (Exception ex)
            {
                return ApiResponse<GetDashboardHistoryQueryDto>.Fail($"Error: {ex.Message}",
                    HttpStatusCode.InternalServerError);
            }
        }
    }
}