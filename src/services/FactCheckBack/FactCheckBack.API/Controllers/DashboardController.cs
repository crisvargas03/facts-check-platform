using FactCheckBack.Business.Features.Dashboard.SummaryQuery;
using FactCheckBack.Business.Features.Dashboard.ComparisonQuery;
using FactCheckBack.Business.Features.Dashboard.HistoryQuery;
using FactCheckBack.Business.Features.Dashboard.AnalysisByIdQuery;
using LiteBus.Queries.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

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
            [FromQuery] string user,
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null)
        {
            var query = new GetDashboardSummaryQuery(user, startDate, endDate);
            var response = await queryMediator.QueryAsync(query);

            if (!response.IsSuccess)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("comparison")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetDashboardComparison(
            [FromQuery] string user,
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null)
        {
            var query = new GetDashboardComparisonQuery(startDate, endDate, user);
            var response = await queryMediator.QueryAsync(query);

            if (!response.IsSuccess)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("history")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetDashboardHistory(
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var query = new GetDashboardHistoryQuery(startDate, endDate, page, pageSize);
            var response = await queryMediator.QueryAsync(query);

            if (!response.IsSuccess)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("analysis/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAnalysisById([FromRoute] string id)
        {
            var query = new GetAnalysisByIdQuery(id);
            var response = await queryMediator.QueryAsync(query);

            if (!response.IsSuccess)
            {
                return response.StatusCode switch
                {
                    HttpStatusCode.NotFound => NotFound(response),
                    _ => BadRequest(response)
                };
            }

            return Ok(response);
        }
    }
}