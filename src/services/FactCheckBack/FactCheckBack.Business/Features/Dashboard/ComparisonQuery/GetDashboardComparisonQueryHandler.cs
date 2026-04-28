using FactCheckBack.Data.Core.UnitOfWork;
using FactCheckBack.Models.Configurations;
using LiteBus.Queries.Abstractions;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace FactCheckBack.Business.Features.Dashboard.ComparisonQuery
{
    public class GetDashboardComparisonQueryHandler(IFactCheckBackIoW unitOfWork)
        : IQueryHandler<GetDashboardComparisonQuery,
            ApiResponse<GetDashboardComparisonQueryDto>>
    {
        public async Task<ApiResponse<GetDashboardComparisonQueryDto>> HandleAsync(GetDashboardComparisonQuery request,
            CancellationToken cancellationToken = default)
        {
            try
            {
                if (!await unitOfWork.CanConnectAsync())
                    return ApiResponse<GetDashboardComparisonQueryDto>.Fail(
                        "No se puede conectar a la base de datos",
                        HttpStatusCode.ServiceUnavailable);

                if (string.IsNullOrWhiteSpace(request.User))
                    return ApiResponse<GetDashboardComparisonQueryDto>.Fail(
                        "Usuario requerido.",
                        HttpStatusCode.BadRequest);

                var user = await unitOfWork.Users.Query(false)
                    .FirstOrDefaultAsync(u => u.email == request.User || u.user_id == request.User, cancellationToken);

                if (user is null)
                    return ApiResponse<GetDashboardComparisonQueryDto>.Fail(
                        "No fueron encontrados datos para este usuario.",
                        HttpStatusCode.BadRequest);

                DateTime startUtc = request.StartDate.HasValue
                    ? (request.StartDate.Value.Kind == DateTimeKind.Utc
                        ? request.StartDate.Value.Date
                        : request.StartDate.Value.ToUniversalTime().Date)
                    : DateTime.UtcNow.Date.AddDays(-6);

                DateTime endExclusiveUtc = request.EndDate.HasValue
                    ? ((request.EndDate.Value.Kind == DateTimeKind.Utc
                        ? request.EndDate.Value.Date
                        : request.EndDate.Value.ToUniversalTime().Date).AddDays(1))
                    : DateTime.UtcNow.Date.AddDays(1);

                if (endExclusiveUtc <= startUtc)
                    return ApiResponse<GetDashboardComparisonQueryDto>.Fail(
                        "El rango de fechas es inválido.",
                        HttpStatusCode.BadRequest);

                var daily = await unitOfWork.Results.Query(false)
                    .Where(r =>
                        r.Article_input.user_id == user.user_id &&
                        r.created >= startUtc &&
                        r.created < endExclusiveUtc)
                    .GroupBy(r => new
                    {
                        DayUtc = r.created.Date,
                        Category = r.percentaje_trust >= 70 ? "Real" : "Fake"
                    })
                    .Select(g => new
                    {
                        g.Key.DayUtc,
                        g.Key.Category,
                        Count = g.Count()
                    })
                    .ToListAsync(cancellationToken);

                static int IndexMon0(DateTime d) => ((int)d.DayOfWeek + 6) % 7;

                var fakeByDow = new int[7];
                var realByDow = new int[7];

                foreach (var row in daily)
                {
                    int idx = IndexMon0(row.DayUtc);
                    if (row.Category == "Real") realByDow[idx] += row.Count;
                    else fakeByDow[idx] += row.Count;
                }

                var daysOfWeek = new[] { "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom" };
                var weeklyData = Enumerable.Range(0, 7).Select(i => new WeeklyDataDto
                {
                    Day = daysOfWeek[i],
                    FakeArticles = fakeByDow[i],
                    RealArticles = realByDow[i]
                }).ToList();

                var totalFake = fakeByDow.Sum();
                var totalReal = realByDow.Sum();

                return ApiResponse<GetDashboardComparisonQueryDto>.Success(new GetDashboardComparisonQueryDto
                {
                    WeeklyData = weeklyData,
                    TotalFakeArticles = totalFake,
                    TotalRealArticles = totalReal
                });
            }
            catch (Exception ex)
            {
                return ApiResponse<GetDashboardComparisonQueryDto>.Fail(
                    $"Error: {ex.Message}",
                    HttpStatusCode.InternalServerError);
            }
        }
    }
}