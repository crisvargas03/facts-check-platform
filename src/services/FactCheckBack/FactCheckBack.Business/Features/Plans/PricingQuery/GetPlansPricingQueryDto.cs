namespace FactCheckBack.Business.Features.Plans.PricingQuery
{
    public class GetPlansPricingQueryDto
    {
        public string PlanId { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Price { get; set; } = string.Empty;
        public IList<string> Options { get; set; } = [];
    }
}
