using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FactCheckBack.Business.Features.Article.AnalyzeArticle
{
    public class AnalyzeArticleCommandDto
    {
        public decimal Percentaje_Trust { get; set; } = 0;
        public string Motive { get; set; } = string.Empty;
    }
}
