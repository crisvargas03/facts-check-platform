using FactCheckBack.Models.Configurations;
using LiteBus.Queries.Abstractions;

namespace FactCheckBack.Business.Features.Dashboard.AnalysisByIdQuery
{
    public class GetAnalysisByIdQuery : IQuery<ApiResponse<GetAnalysisByIdQueryDto>>
    {
        public string Id { get; }

        public GetAnalysisByIdQuery(string id)
        {
            Id = id;
        }
    }
} 