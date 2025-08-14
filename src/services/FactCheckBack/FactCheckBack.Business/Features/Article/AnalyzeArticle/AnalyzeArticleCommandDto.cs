using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FactCheckBack.Business.Features.Article.AnalyzeArticle
{
    public class AnalyzeArticleCommandDto
    {
        public decimal PercentageTrust { get; set; } = 0;
        public decimal ReliableSource { get; set; } = 0;
        public decimal ScientificEvidence { get; set; } = 0;
        public decimal CitationsAndReferences { get; set; } = 0;
        public decimal TargetLanguage { get; set; } = 0;
        public decimal ContextAndLimitations { get; set; } = 0;
        public string Motive { get; set; } = string.Empty;
    }
}
