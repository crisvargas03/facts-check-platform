using FactCheckBack.Models.Configurations;
using LiteBus.Queries.Abstractions;

namespace FactCheckBack.Business.Features.Dashboard.ComparisonQuery
{
    public class GetDashboardComparisonQuery : IQuery<ApiResponse<GetDashboardComparisonQueryDto>>
    {
        public DateTime? StartDate { get; }
        public DateTime? EndDate { get; }
        public string User { get; }

        public GetDashboardComparisonQuery(DateTime? startDate, DateTime? endDate, string user)
        {
            StartDate = startDate;
            EndDate = endDate;
            User = user;
        }
    }
} 