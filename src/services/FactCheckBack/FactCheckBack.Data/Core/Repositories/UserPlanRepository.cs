using FactCheckBack.Data.Context;
using FactCheckBack.Data.Core.Interfaces;
using FactCheckBack.Models.Entities;

namespace FactCheckBack.Data.Core.Repositories
{
    public class UserPlanRepository : BaseRepository<User_plan>, IUserPlanRepository
    {
        private readonly FactCheckBackDbContext _context;
        public UserPlanRepository(FactCheckBackDbContext context) : base(context)
        {
            _context = context;
        }
        public override async Task CreateAsync(User_plan entity)
        {
            await _context.Set<User_plan>().AddAsync(entity);
        }
    }
}
