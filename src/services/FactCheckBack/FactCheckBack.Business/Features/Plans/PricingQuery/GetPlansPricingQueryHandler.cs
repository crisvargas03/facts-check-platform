using FactCheckBack.Data.Core.UnitOfWork;
using FactCheckBack.Models.Configurations;
using LiteBus.Messaging.Abstractions;
using LiteBus.Queries.Abstractions;

namespace FactCheckBack.Business.Features.Plans.PricingQuery
{
    public class GetPlansPricingQueryHandler : IQueryHandler<GetPlansPricingQuery, ApiResponse<IEnumerable<GetPlansPricingQueryDto>>>
    {
        private readonly IFactCheckBackIoW _unitOfWork;

        public GetPlansPricingQueryHandler(IFactCheckBackIoW unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        async Task<ApiResponse<IEnumerable<GetPlansPricingQueryDto>>> IAsyncMessageHandler<GetPlansPricingQuery, ApiResponse<IEnumerable<GetPlansPricingQueryDto>>>.HandleAsync(GetPlansPricingQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var plans = await _unitOfWork.Plan.GetWithOptions();
                if (plans is null || !plans.Any())
                {
                    return ApiResponse<IEnumerable<GetPlansPricingQueryDto>>
                        .Fail("No plans found", System.Net.HttpStatusCode.NotFound, []);
                }

                var plansDto = plans.Select(plan => new GetPlansPricingQueryDto
                {
                    PlanId = plan.plans_id,
                    Description = plan.plan_type.desc_text,
                    Price = plan.price,
                    Options = [.. plan.Plan_Options.Select(options => options.description)]
                });

                return ApiResponse<IEnumerable<GetPlansPricingQueryDto>>.Success(plansDto);
            }
            catch (Exception ex)
            {
                return  ApiResponse<IEnumerable<GetPlansPricingQueryDto>>.Fail(ex.Message, System.Net.HttpStatusCode.InternalServerError, []);
            }
        }
    }
}
