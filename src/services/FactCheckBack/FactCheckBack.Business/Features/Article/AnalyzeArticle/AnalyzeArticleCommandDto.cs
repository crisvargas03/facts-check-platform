using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FactCheckBack.Business.Features.Article.AnalyzeArticle
{
    public class AnalyzeArticleCommandDto
    {
        [JsonPropertyName("motive")]
        public string Motive { get; set; } = string.Empty;
        
        [JsonPropertyName("percentageTrust")]
        public decimal PercentageTrust { get; set; } = 0;
        [JsonPropertyName("remainingAttempts")]
        public decimal RemainingAttempts { get; set; } = 0;

        [JsonPropertyName("evaluation-factors")]
        public List<EvaluationFactorDto> EvaluationFactors { get; set; } = new List<EvaluationFactorDto>();
    }

    public class EvaluationFactorDto
    {
        [JsonPropertyName("description")]
        public string Descripcion { get; set; } = string.Empty;
        
        [JsonPropertyName("score")]
        public decimal EvaluationResult { get; set; } = 0;
        
        [JsonPropertyName("name")]
        public string Title { get; set; } = string.Empty;
    }
}
