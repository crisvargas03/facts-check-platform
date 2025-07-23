using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using FactCheckBack.Data.Context;
using FactCheckBack.Data.Core.Exceptions;
using FactCheckBack.Data.Core.Interfaces;
using FactCheckBack.Models.AI;
using FactCheckBack.Models.Configurations;
using FactCheckBack.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace FactCheckBack.Data.Core.Repositories
{
    public class ArticleInputRepository : BaseRepository<Article_input>, IArticleInputRepository
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        public ArticleInputRepository(FactCheckBackDbContext context, HttpClient httpClient, IConfiguration configuration) : base(context)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }
        public async Task<ApiResponse<AiAnalysisResponse>> AnalyzeArticleAsync(string title, string body, string image)
        {
            try
            {
                var requestBody = new
                {
                    title,
                    body,
                    image
                };

                var apiUrl = _configuration["AiApi:Url"];

                var response = await _httpClient.PostAsJsonAsync(apiUrl, requestBody);

                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    return ApiResponse<AiAnalysisResponse>.Fail(
                        $"AI API error: {response.StatusCode} - {errorContent}",
                        response.StatusCode
                    );
                }

                var jsonResponse = await response.Content.ReadFromJsonAsync<AiApiResponse>();

                if (jsonResponse is null || jsonResponse.Result is null)
                {
                    return ApiResponse<AiAnalysisResponse>.Fail("Empty or invalid AI API response", HttpStatusCode.BadGateway);
                }

                return ApiResponse<AiAnalysisResponse>.Success(jsonResponse.Result);
            }
            catch (Exception ex)
            {
                var fullMessage = ex.InnerException?.Message ?? ex.Message;
                return ApiResponse<AiAnalysisResponse>.Fail("Exception calling AI API: " + fullMessage, HttpStatusCode.InternalServerError);
            }
        }

        
    }
}
