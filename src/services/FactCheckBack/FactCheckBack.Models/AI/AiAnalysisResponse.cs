using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FactCheckBack.Models.AI
{
    public class AiAnalysisResponse
    {
        public decimal fake_rating { get; set; }
        public string feedback { get; set; } = string.Empty;
    }
}
