using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FactCheckBack.Models.AI
{
    public class AiAnalysisResponse
    {
        [JsonPropertyName("percentaje_trust")]
        public decimal PercentajeTrust { get; set; }

        [JsonPropertyName("reliable_source")]
        public decimal ReliableSource { get; set; }

        [JsonPropertyName("scientific_evidence")]
        public decimal ScientificEvidence { get; set; }

        [JsonPropertyName("citations_and_references")]
        public decimal CitationsAndReferences { get; set; }

        [JsonPropertyName("target_language")]
        public decimal TargetLanguage { get; set; }

        [JsonPropertyName("context_and_limitations")]
        public decimal ContextAndLimitations { get; set; }

        [JsonPropertyName("feedback")]
        public string Feedback { get; set; } = string.Empty;
    }
}
