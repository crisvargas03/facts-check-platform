using FactCheckBack.Business.Features.Auth.Login;
using FactCheckBack.Models.Configurations;
using LiteBus.Commands.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FactCheckBack.Business.Features.Article.AnalyzeArticle
{
    public class AnalyzeArticleCommand : ICommand<ApiResponse<AnalyzeArticleCommandDto>>
    {
        public string Email { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string CompleteText { get; set; } = string.Empty;
    }
}
