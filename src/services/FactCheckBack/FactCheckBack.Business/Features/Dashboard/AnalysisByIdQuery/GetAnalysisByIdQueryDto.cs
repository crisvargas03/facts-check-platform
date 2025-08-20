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
        public decimal ReliableSource { get; set; }
        public decimal ScientificEvidence { get; set; }
        public decimal CitationsAndReferences { get; set; }
        public decimal TargetLanguage { get; set; }
        public decimal ContextAndLimitations { get; set; }
        public DateTime AnalysisDate { get; set; }
    }
} 