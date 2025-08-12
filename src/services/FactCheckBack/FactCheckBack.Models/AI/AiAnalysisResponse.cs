using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FactCheckBack.Models.AI
{
    public class AiAnalysisResponse
    {
        public decimal percentaje_trust { get; set; }
        public decimal reliable_source { get; set; }
        public decimal scientific_evidence { get; set; }
        public decimal citations_and_references { get; set; }
        public decimal target_language { get; set; }
        public decimal context_and_limitations { get; set; }
        public string feedback { get; set; } = string.Empty;
    }
}
