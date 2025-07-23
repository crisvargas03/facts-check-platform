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
    public class ResultRepository : BaseRepository<Result>, IResultRepository
    {
        public ResultRepository(FactCheckBackDbContext context) : base(context)
        {
            _context = context;
        }
        public override async Task CreateAsync(Result entity)
        {
            await _context.Set<Result>().AddAsync(entity);
        }
    }
}
