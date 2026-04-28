using FactCheckBack.Models.Configurations;
using LiteBus.Commands.Abstractions;

namespace FactCheckBack.Business.Features.Article.AnalyzeArticle
{
    public class AnalyzeArticleCommand : ICommand<ApiResponse<AnalyzeArticleCommandDto>>
    {
        public string Email { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
    }
}
