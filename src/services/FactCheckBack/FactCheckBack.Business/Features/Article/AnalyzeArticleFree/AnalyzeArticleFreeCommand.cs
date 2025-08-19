using FactCheckBack.Business.Features.Article.AnalyzeArticle;
using FactCheckBack.Models.Configurations;
using LiteBus.Commands.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FactCheckBack.Business.Features.Article.AnalyzeArticleFree
{
    public class AnalyzeArticleFreeCommand : ICommand<ApiResponse<AnalyzeArticleCommandDto>>
    {
        public string Title { get; set; } = string.Empty;
        public string CompleteText { get; set; } = string.Empty;
    }
}
