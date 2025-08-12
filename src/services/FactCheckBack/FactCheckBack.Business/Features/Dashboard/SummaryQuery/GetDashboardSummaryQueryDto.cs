namespace FactCheckBack.Business.Features.Dashboard.SummaryQuery
{
    public class GetDashboardSummaryQueryDto
    {
        public int TotalAnalyzed { get; set; }
        public int RealScans { get; set; }
        public int InaccurateScans { get; set; }
        public int FakeScans { get; set; }
    }
} 