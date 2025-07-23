using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FactCheckBack.Models.AI
{
    public class AiApiResponse
    {
        public bool Success { get; set; }
        public string Error { get; set; } = string.Empty;
        public AiAnalysisResponse Result { get; set; } = new();
    }
}
