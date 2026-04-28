using FactCheckBack.Models.Configurations;
using LiteBus.Queries.Abstractions;

namespace FactCheckBack.Business.Features.Dashboard.SummaryQuery
{
    public class GetDashboardSummaryQuery(string user, DateTime? startDate, DateTime? endDate)
        : IQuery<ApiResponse<GetDashboardSummaryQueryDto>>
    {
        public DateTime? StartDate { get; } = startDate;
        public DateTime? EndDate { get; } = endDate;
        public string User { get; } = user;
    }
} 