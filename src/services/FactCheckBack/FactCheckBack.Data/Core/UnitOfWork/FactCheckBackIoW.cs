using Microsoft.EntityFrameworkCore;
using FactCheckBack.Data.Context;
using FactCheckBack.Data.Core.Interfaces;
using FactCheckBack.Data.Core.Repositories;

namespace FactCheckBack.Data.Core.UnitOfWork
{
    public class FactCheckBackIoW : IFactCheckBackIoW, IDisposable
    {
        private readonly FactCheckBackDbContext _context;

        public IUserRepository Users { get; private set; }
        public IUserPlanRepository User_plan { get; private set; }
        public IPlanRepository Plan { get; private set; }

        public FactCheckBackIoW(FactCheckBackDbContext context)
        {
            _context = context;
            Users = new UserRepository(context);
            User_plan = new UserPlanRepository(context);
            Plan = new PlanRepository(context);
        }

        public async Task<int> CompleteAsync() => await _context.SaveChangesAsync();
        public async Task<bool> CanConnectAsync() => await _context.Database.CanConnectAsync();

        public async Task<bool> ExecuteHealthCheckCommandAsync()
        {
            try
            {
                _ = await _context.Database.ExecuteSqlRawAsync("SELECT 1");
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        
        public void Dispose() => _context.Dispose();
    }
}
