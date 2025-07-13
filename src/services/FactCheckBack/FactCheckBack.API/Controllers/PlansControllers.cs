using FactCheckBack.Business.Features.Plans.PricingQuery;
using LiteBus.Queries.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FactCheckBack.API.Controllers
{
    [Route("api/plans")]
    [ApiController]
    public class PlansControllers : ControllerBase
    {
        private readonly IQueryMediator _queryMediator;

        public PlansControllers(IQueryMediator queryMediator)
        {
            _queryMediator = queryMediator;
        }


        [HttpGet("pricing")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetPlansPricing()
        {
            var response = await _queryMediator.QueryAsync(new GetPlansPricingQuery());
            if (!response.IsSuccess)
                return BadRequest(response);

            return Ok(response);
        }
    }
}
