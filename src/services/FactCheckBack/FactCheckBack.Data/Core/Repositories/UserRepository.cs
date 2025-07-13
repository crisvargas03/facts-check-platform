using FactCheckBack.Data.Context;
using FactCheckBack.Data.Core.Interfaces;
using FactCheckBack.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace FactCheckBack.Data.Core.Repositories
{
    public class UserRepository : BaseRepository<Users>, IUserRepository
    {
        private readonly FactCheckBackDbContext _context;
        public UserRepository(FactCheckBackDbContext context) : base(context)
        {
            _context = context;
        }
        public override  async Task CreateAsync(Users entity)
        {
            await _context.Set<Users>().AddAsync(entity);
        }
    }
}
