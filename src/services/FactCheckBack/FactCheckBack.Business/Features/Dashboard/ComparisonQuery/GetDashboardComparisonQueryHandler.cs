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
                    return ApiResponse<GetDashboardComparisonQueryDto>.Fail("No se puede conectar a la base de datos",
                        HttpStatusCode.ServiceUnavailable);

                if (request.User is null)
                    return ApiResponse<GetDashboardComparisonQueryDto>.Fail("No fueron encontrados datos para este usuario.",
                        HttpStatusCode.BadRequest);

                var user = await unitOfWork.Users.Query(false)
                    .FirstOrDefaultAsync(u => u.email == request.User || u.user_id == request.User, cancellationToken);

                if (user is null)
                    return ApiResponse<GetDashboardComparisonQueryDto>.Fail("No fueron encontrados datos para este usuario.",
                        HttpStatusCode.BadRequest);

                var weekStart = DateTime.Today.AddDays(-6).ToUniversalTime();
                var weekEnd = DateTime.Today.AddDays(1).ToUniversalTime();
                var daysOfWeek = new[] { "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom" };

                if (request.StartDate.HasValue) weekStart = request.StartDate.Value.ToUniversalTime();
                if (request.EndDate.HasValue) weekEnd = request.EndDate.Value.ToUniversalTime();

                var dailyStats = await unitOfWork.Results.Query(false)
                    .Where(r => r.Article_input.user_id == user.user_id && r.created >= weekStart && r.created <= weekEnd)
                    .GroupBy(r => new
                    {
                        Day = r.created.Date,
                        IsFake = r.percentaje_trust < 40,
                        IsReal = r.percentaje_trust >= 70
                    })
                    .Select(g => new
                    {
                        g.Key.Day,
                        g.Key.IsFake,
                        g.Key.IsReal,
                        Count = g.Count()
                    })
                    .ToListAsync(cancellationToken);

                var weeklyData = new List<WeeklyDataDto>();
                var totalFakeArticles = 0;
                var totalRealArticles = 0;

                for (var i = 0; i < 7; i++)
                {
                    var currentDay = DateTime.Today.AddDays(-6 + i).Date;
                    var dayStats = dailyStats.Where(s => s.Day == currentDay).ToList();

                    var fakeArticles = dayStats.Where(s => s.IsFake).Sum(s => s.Count);
                    var realArticles = dayStats.Where(s => s.IsReal).Sum(s => s.Count);

                    weeklyData.Add(new WeeklyDataDto
                    {
                        Day = daysOfWeek[i],
                        FakeArticles = fakeArticles,
                        RealArticles = realArticles
                    });

                    totalFakeArticles += fakeArticles;
                    totalRealArticles += realArticles;
                }

                return ApiResponse<GetDashboardComparisonQueryDto>.Success(new GetDashboardComparisonQueryDto
                {
                    WeeklyData = weeklyData,
                    TotalFakeArticles = totalFakeArticles,
                    TotalRealArticles = totalRealArticles
                });
            }
            catch (Exception ex)
            {
                return ApiResponse<GetDashboardComparisonQueryDto>.Fail($"Error: {ex.Message}",
                    HttpStatusCode.InternalServerError);
            }
        }
    }
}