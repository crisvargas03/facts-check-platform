using FactCheckBack.Data.Context;
using FactCheckBack.Data.Core.Interfaces;
using FactCheckBack.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FactCheckBack.Data.Core.Repositories
{
    public class UserPlanRepository : BaseRepository<User_plan>, IUserPlanRepository
    {
        //private readonly FactCheckBackDbContext _context;
        public UserPlanRepository(FactCheckBackDbContext context) : base(context)
        {
        }
        public override async Task CreateAsync(User_plan entity)
        {
            await _context.Set<User_plan>().AddAsync(entity);
        }
    }
}
