using FactCheckBack.Business.Features.Dashboard.SummaryQuery;
using FactCheckBack.Business.Features.Dashboard.ComparisonQuery;
using LiteBus.Queries.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FactCheckBack.API.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    [AllowAnonymous]
    public class DashboardController(IQueryMediator queryMediator) : ControllerBase
    {
        [HttpGet("summary")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetDashboardSummary(
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null)
        {
            var query = new GetDashboardSummaryQuery(startDate, endDate);
            var response = await queryMediator.QueryAsync(query);

            if (!response.IsSuccess)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("comparison")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetDashboardComparison(
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null)
        {
            var query = new GetDashboardComparisonQuery(startDate, endDate);
            var response = await queryMediator.QueryAsync(query);

            if (!response.IsSuccess)
                return BadRequest(response);

            return Ok(response);
        }
    }
}