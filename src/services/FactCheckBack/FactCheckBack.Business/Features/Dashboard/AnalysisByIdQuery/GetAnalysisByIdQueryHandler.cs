using FactCheckBack.Data.Core.UnitOfWork;
using FactCheckBack.Models.Configurations;
using LiteBus.Queries.Abstractions;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace FactCheckBack.Business.Features.Dashboard.AnalysisByIdQuery
{
    public class GetAnalysisByIdQueryHandler(IFactCheckBackIoW unitOfWork) : IQueryHandler<GetAnalysisByIdQuery,
        ApiResponse<GetAnalysisByIdQueryDto>>
    {
        public async Task<ApiResponse<GetAnalysisByIdQueryDto>> HandleAsync(GetAnalysisByIdQuery request,
            CancellationToken cancellationToken = default)
        {
            try
            {
                if (!await unitOfWork.CanConnectAsync())
                    return ApiResponse<GetAnalysisByIdQueryDto>.Fail("No se puede conectar a la base de datos",
                        HttpStatusCode.ServiceUnavailable);

                var analysis = await unitOfWork.Results.Query(false)
                    .Include(r => r.Article_input)
                    .Include(r => r.Verdict)
                    .Where(r => r.result_id == request.Id)
                    .Select(r => new GetAnalysisByIdQueryDto
                    {
                        Id = r.result_id,
                        ArticleId = r.article_id,
                        VerdictId = r.verdict_id,
                        ArticleName = r.Article_input.title,
                        Credibility = r.percentaje_trust,
                        Motive = r.motive,
                        ReliableSource = r.reliable_source,
                        ScientificEvidence = r.scientific_evidence,
                        CitationsAndReferences = r.citations_and_references,
                        TargetLanguage = r.target_language,
                        ContextAndLimitations = r.context_and_limitations,
                        AnalysisDate = r.created
                    })
                    .FirstOrDefaultAsync(cancellationToken);

                if (analysis == null)
                    return ApiResponse<GetAnalysisByIdQueryDto>.Fail("Análisis no encontrado", HttpStatusCode.NotFound);

                return ApiResponse<GetAnalysisByIdQueryDto>.Success(analysis);
            }
            catch (Exception ex)
            {
                return ApiResponse<GetAnalysisByIdQueryDto>.Fail($"Error: {ex.Message}",
                    HttpStatusCode.InternalServerError);
            }
        }
    }
}