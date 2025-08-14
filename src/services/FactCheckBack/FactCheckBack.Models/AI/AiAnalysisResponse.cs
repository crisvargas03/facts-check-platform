using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FactCheckBack.Models.AI
{
    public class AiAnalysisResponse
    {
        public decimal PercentageTrust { get; set; }
        public decimal ReliableSource { get; set; }
        public decimal ScientificEvidence { get; set; }
        public decimal CitationsAndReferences { get; set; }
        public decimal TargetLanguage { get; set; }
        public decimal ContextAndLimitations { get; set; }
        public string Feedback { get; set; } = string.Empty;
    }
}
