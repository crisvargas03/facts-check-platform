using FactCheckBack.Models.Configurations;
using LiteBus.Queries.Abstractions;

namespace FactCheckBack.Business.Features.Plans.PricingQuery
{
    public class GetPlansPricingQuery : IQuery<ApiResponse<IEnumerable<GetPlansPricingQueryDto>>>
    {
    }
}
