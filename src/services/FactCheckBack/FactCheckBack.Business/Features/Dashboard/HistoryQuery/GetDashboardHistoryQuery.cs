using FactCheckBack.Models.Configurations;
using LiteBus.Queries.Abstractions;

namespace FactCheckBack.Business.Features.Dashboard.HistoryQuery
{
    public class GetDashboardHistoryQuery : IQuery<ApiResponse<GetDashboardHistoryQueryDto>>
    {
        public DateTime? StartDate { get; }
        public DateTime? EndDate { get; }
        public int Page { get; }
        public int PageSize { get; }

        public GetDashboardHistoryQuery(DateTime? startDate, DateTime? endDate, int page, int pageSize)
        {
            StartDate = startDate;
            EndDate = endDate;
            Page = page;
            PageSize = pageSize;
        }
    }
}