using Microsoft.EntityFrameworkCore;
using FactCheckBack.Data.Context;

namespace FactCheckBack.Data.Core.UnitOfWork
{
    public class FactCheckBackIoW : IFactCheckBackIoW, IDisposable
    {
        private readonly FactCheckBackDbContext _context;

        // TODO: Set Repositories Here

        public FactCheckBackIoW(FactCheckBackDbContext context)
        {
            _context = context;
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
