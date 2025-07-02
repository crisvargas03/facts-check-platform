using FactCheckBack.Data.Context;
using FactCheckBack.Data.Core.Interfaces;
using FactCheckBack.Models.Entities;

namespace FactCheckBack.Data.Core.Repositories
{
    public class UserRepository : BaseRepository<Users>, IUserRepository
    {
        public UserRepository(FactCheckBackDbContext context) : base(context)
        {
        }
    }
}
