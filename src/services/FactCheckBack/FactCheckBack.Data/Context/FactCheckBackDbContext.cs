using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace FactCheckBack.Data.Context
{
    public class FactCheckBackDbContext : DbContext
    {
        public FactCheckBackDbContext(DbContextOptions<FactCheckBackDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
