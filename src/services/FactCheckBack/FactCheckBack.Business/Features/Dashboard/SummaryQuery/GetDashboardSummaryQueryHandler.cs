using FactCheckBack.Data.Core.UnitOfWork;
using FactCheckBack.Models.Configurations;
using LiteBus.Queries.Abstractions;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace FactCheckBack.Business.Features.Dashboard.SummaryQuery
{
    public class
        GetDashboardSummaryQueryHandler(IFactCheckBackIoW unitOfWork) : IQueryHandler<GetDashboardSummaryQuery,
        ApiResponse<GetDashboardSummaryQueryDto>>
    {
        public async Task<ApiResponse<GetDashboardSummaryQueryDto>> HandleAsync(GetDashboardSummaryQuery request,
            CancellationToken cancellationToken = default)
        {
            try
            {
                var canConnect = await unitOfWork.CanConnectAsync();
                if (!canConnect)
                {
                    return ApiResponse<GetDashboardSummaryQueryDto>.Fail("No se puede conectar a la base de datos",
                        HttpStatusCode.ServiceUnavailable);
                }

                var query = unitOfWork.Results.Query(false);

                if (request.StartDate.HasValue)
                {
                    query = query.Where(r => r.created >= request.StartDate.Value);
                }

                if (request.EndDate.HasValue)
                {
                    query = query.Where(r => r.created <= request.EndDate.Value);
                }

                var totalAnalyzed = await query.CountAsync(cancellationToken);
                var realScans = await query.Where(r => r.percentaje_trust >= 70).CountAsync(cancellationToken);
                var inaccurateScans = await query.Where(r => r.percentaje_trust >= 40 && r.percentaje_trust < 70)
                    .CountAsync(cancellationToken);
                var fakeScans = await query.Where(r => r.percentaje_trust < 40).CountAsync(cancellationToken);

                var result = new GetDashboardSummaryQueryDto
                {
                    TotalAnalyzed = totalAnalyzed,
                    RealScans = realScans,
                    InaccurateScans = inaccurateScans,
                    FakeScans = fakeScans
                };

                return ApiResponse<GetDashboardSummaryQueryDto>.Success(result);
            }
            catch (Exception ex)
            {
                return ApiResponse<GetDashboardSummaryQueryDto>.Fail($"Error: {ex.Message}",
                    HttpStatusCode.InternalServerError);
            }
        }
    }
}