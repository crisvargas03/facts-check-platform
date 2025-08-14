using FactCheckBack.Data.Context;
using FactCheckBack.Data.Core.Exceptions;
using FactCheckBack.Data.Core.Interfaces;
using FactCheckBack.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace FactCheckBack.Data.Core.Repositories
{
    public class PlanRepository : BaseRepository<Plan>, IPlanRepository
    {
        public PlanRepository(FactCheckBackDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Plan>> GetWithOptions()
        {
            try
            {
                return await _context.Plans.Include(x => x.Plan_Options)
                     .Include(x => x.plan_type)
                     .OrderBy(x => x.max_attempts)
                     .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new DataException($"Error retrieving plans with options - { ex.Message }");
            }
        }
        public async Task<Plan?> GetByPlanIdAsync(string planId)
        {
            return await _context.Set<Plan>().FirstOrDefaultAsync(p => p.plans_id == planId);
        }
    }
}
