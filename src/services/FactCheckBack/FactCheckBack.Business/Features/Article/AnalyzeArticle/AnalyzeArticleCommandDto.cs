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
        public decimal Reliable_source { get; set; } = 0;
        public decimal Scientific_evidence { get; set; } = 0;
        public decimal Citations_and_references { get; set; } = 0;
        public decimal Target_language { get; set; } = 0;
        public decimal Context_and_limitations { get; set; } = 0;
        public string Motive { get; set; } = string.Empty;
    }
}
