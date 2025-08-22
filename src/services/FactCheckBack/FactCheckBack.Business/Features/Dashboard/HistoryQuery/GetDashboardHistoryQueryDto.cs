using FactCheckBack.Business.Features.Article.AnalyzeArticle;

namespace FactCheckBack.Business.Features.Dashboard.HistoryQuery
{
    public class GetDashboardHistoryQueryDto
    {
        public List<HistoryItemDto> Items { get; set; } = new List<HistoryItemDto>();
        public PaginationDto Pagination { get; set; } = new PaginationDto();
    }

    public class HistoryItemDto
    {
        public string Id { get; set; } = string.Empty;
        public string ArticleName { get; set; } = string.Empty;
        public decimal Credibility { get; set; }
        public DateTime AnalysisDate { get; set; }
        public string Summary { get; set; } = string.Empty;
        public List<EvaluationFactorDto> EvaluationFactors { get; set; } = [];
    }

    public class PaginationDto
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int TotalItems { get; set; }
        public int PageSize { get; set; }
    }
} 