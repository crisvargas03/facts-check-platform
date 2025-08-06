namespace FactCheckBack.Business.Features.Dashboard.AnalysisByIdQuery
{
    public class GetAnalysisByIdQueryDto
    {
        public string Id { get; set; } = string.Empty;
        public string ArticleId { get; set; } = string.Empty;
        public string VerdictId { get; set; } = string.Empty;
        public string ArticleName { get; set; } = string.Empty;
        public decimal Credibility { get; set; }
        public string Motive { get; set; } = string.Empty;
        public DateTime AnalysisDate { get; set; }
    }
} 