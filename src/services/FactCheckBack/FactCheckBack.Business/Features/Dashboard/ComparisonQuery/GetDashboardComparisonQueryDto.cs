namespace FactCheckBack.Business.Features.Dashboard.ComparisonQuery
{
    public class GetDashboardComparisonQueryDto
    {
        public List<WeeklyDataDto> WeeklyData { get; set; } = new List<WeeklyDataDto>();
        public int TotalFakeArticles { get; set; }
        public int TotalRealArticles { get; set; }
    }

    public class WeeklyDataDto
    {
        public string Day { get; set; } = string.Empty;
        public int FakeArticles { get; set; }
        public int RealArticles { get; set; }
    }
} 