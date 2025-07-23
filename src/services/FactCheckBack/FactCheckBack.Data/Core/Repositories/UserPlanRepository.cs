using FactCheckBack.Data.Context;
using FactCheckBack.Data.Core.Interfaces;
using FactCheckBack.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace FactCheckBack.Data.Core.Repositories
{
    public class UserPlanRepository : BaseRepository<User_plan>, IUserPlanRepository
    {
        public UserPlanRepository(FactCheckBackDbContext context) : base(context)
        {
            _context = context;
        }
        public override async Task CreateAsync(User_plan entity)
        {
            await _context.Set<User_plan>().AddAsync(entity);
        }
        public override async Task UpdateAsync(User_plan entity)
        {
            _context.Set<User_plan>().Update(entity);
            await Task.CompletedTask;
        }
        public async Task<User_plan?> GetByUserIdAsync(string userId)
        {
            return await _context.Set<User_plan>()
                .FirstOrDefaultAsync(up => up.user_id == userId);
        }
    }
}
