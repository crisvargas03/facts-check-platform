using FactCheckBack.Business.Features.Dashboard.ComparisonQuery;
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

                if (request.User is null)
                    return ApiResponse<GetDashboardSummaryQueryDto>.Fail("No fueron encontrados datos para este usuario.",
                        HttpStatusCode.BadRequest);

                var user = await unitOfWork.Users.Query(false)
                    .Select(x => new { x.user_id, x.email })
                    .FirstOrDefaultAsync(u => u.email == request.User || u.user_id == request.User, cancellationToken);

                if (user is null)
                    return ApiResponse<GetDashboardSummaryQueryDto>.Fail("No fueron encontrados datos para este usuario.",
                        HttpStatusCode.BadRequest);

                var baseQuery = unitOfWork.Results.Query(false)
                    .Where(r => r.Article_input.user_id == user.user_id);

                if (request.StartDate.HasValue)
                {
                    var startDateUtc = request.StartDate.Value.ToUniversalTime();
                    baseQuery = baseQuery.Where(r => r.created >= startDateUtc);
                }

                if (request.EndDate.HasValue)
                {
                    var endDateUtc = request.EndDate.Value.ToUniversalTime();
                    baseQuery = baseQuery.Where(r => r.created <= endDateUtc);
                }

                var stats = await baseQuery
                    .GroupBy(r => new
                    {
                        IsReal = r.percentaje_trust >= 70,
                        IsInaccurate = r.percentaje_trust >= 40 && r.percentaje_trust < 70,
                        IsFake = r.percentaje_trust < 40
                    })
                    .Select(g => new
                    {
                        g.Key.IsReal,
                        g.Key.IsInaccurate,
                        g.Key.IsFake,
                        Count = g.Count()
                    })
                    .ToListAsync(cancellationToken);

                var totalAnalyzed = stats.Sum(s => s.Count);
                var realScans = stats.Where(s => s.IsReal).Sum(s => s.Count);
                var inaccurateScans = stats.Where(s => s.IsInaccurate).Sum(s => s.Count);
                var fakeScans = stats.Where(s => s.IsFake).Sum(s => s.Count);

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