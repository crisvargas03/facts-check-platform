using FactCheckBack.Data.Context;
using FactCheckBack.Data.Core.Interfaces;
using FactCheckBack.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace FactCheckBack.Data.Core.Repositories
{
    public class ResultRepository(FactCheckBackDbContext context) : BaseRepository<Result>(context), IResultRepository
    {
        public async Task<IEnumerable<Result>> GetByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.Results
                .Where(r => r.created >= startDate && r.created <= endDate)
                .ToListAsync();
        }

        public async Task<IEnumerable<Result>> GetByCredibilityRangeAsync(decimal minCredibility,
            decimal maxCredibility)
        {
            return await _context.Results
                .Where(r => r.percentaje_trust >= minCredibility && r.percentaje_trust <= maxCredibility)
                .ToListAsync();
        }
    }
}