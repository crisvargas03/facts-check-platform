using FactCheckBack.Business.Features.Article.AnalyzeArticle;
using FactCheckBack.Business.Features.Article.AnalyzeArticleFree;
using FactCheckBack.Models.AI;
using LiteBus.Commands.Abstractions;
using Microsoft.AspNetCore.Mvc;

namespace FactCheckBack.API.Controllers
{
    [Route("api/articles")]
    [ApiController]
    public class ArticlesControllers : ControllerBase
    {
        private readonly ICommandMediator _commandMediator;
        public ArticlesControllers(ICommandMediator commandMediator)
        {
            _commandMediator = commandMediator;
        }
        [HttpPost("analyze")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Analyze([FromBody] AnalyzeArticleCommand articleRequest)
        {
            var result = await _commandMediator.SendAsync(articleRequest);
            if (!result.IsSuccess)
                return BadRequest(result);

            return Ok(result);
        }
        [HttpPost("analyze/free")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AnalyzeFree([FromBody] AnalyzeArticleFreeCommand articleRequest)
        {
            var result = await _commandMediator.SendAsync(articleRequest);
            if (!result.IsSuccess)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
