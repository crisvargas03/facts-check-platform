using FactCheckBack.Models.AI;
using FactCheckBack.Models.Configurations;
using FactCheckBack.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FactCheckBack.Data.Core.Interfaces
{
    public interface IArticleInputRepository : IBaseRepository<Article_input>
    {
        Task<ApiResponse<AiAnalysisResponse>> AnalyzeArticleAsync(string title, string body, string image);
    }
}
