using FactCheckBack.Data.Core.UnitOfWork;
using FactCheckBack.Models.Configurations;
using LiteBus.Queries.Abstractions;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace FactCheckBack.Business.Features.Dashboard.HistoryQuery
{
    public class GetDashboardHistoryQueryHandler(IFactCheckBackIoW unitOfWork) : IQueryHandler<GetDashboardHistoryQuery,
        ApiResponse<GetDashboardHistoryQueryDto>>
    {
        public async Task<ApiResponse<GetDashboardHistoryQueryDto>> HandleAsync(GetDashboardHistoryQuery request,
            CancellationToken cancellationToken = default)
        {
            try
            {
                if (!await unitOfWork.CanConnectAsync())
                    return ApiResponse<GetDashboardHistoryQueryDto>.Fail("No se puede conectar a la base de datos",
                        HttpStatusCode.ServiceUnavailable);

                var baseQuery = unitOfWork.Results.Query(false);

                if (request.StartDate.HasValue)
                {
                    var startDateUtc = request.StartDate.Value.ToUniversalTime();
                    baseQuery = baseQuery.Where(r => r.created >= startDateUtc);
                }

                if (request.EndDate.HasValue)
                {
                    var endDateUtc = request.EndDate.Value.ToUniversalTime();
                    baseQuery = baseQuery.Where(r => r.created <= endDateUtc);
                }

                var totalItems = await baseQuery.CountAsync(cancellationToken);

                var items = await baseQuery
                    .Include(r => r.Article_input)
                    .OrderByDescending(r => r.created)
                    .Skip((request.Page - 1) * request.PageSize)
                    .Take(request.PageSize)
                    .Select(r => new HistoryItemDto
                    {
                        Id = r.result_id,
                        ArticleName = r.Article_input.title,
                        Credibility = r.percentaje_trust,
                        AnalysisDate = r.created
                    })
                    .ToListAsync(cancellationToken);
                var totalPages = (int)Math.Ceiling((double)totalItems / request.PageSize);

                return ApiResponse<GetDashboardHistoryQueryDto>.Success(new GetDashboardHistoryQueryDto
                {
                    Items = items,
                    Pagination = new PaginationDto
                    {
                        CurrentPage = request.Page,
                        TotalPages = totalPages,
                        TotalItems = totalItems,
                        PageSize = request.PageSize
                    }
                });
            }
            catch (Exception ex)
            {
                return ApiResponse<GetDashboardHistoryQueryDto>.Fail($"Error: {ex.Message}",
                    HttpStatusCode.InternalServerError);
            }
        }
    }
}