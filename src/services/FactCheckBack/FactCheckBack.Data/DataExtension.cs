using FactCheckBack.Data.Context;
using FactCheckBack.Data.Core.Interfaces;
using FactCheckBack.Data.Core.Repositories;
using FactCheckBack.Data.Core.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FactCheckBack.Data
{
    public static class DataExtension
    {
        private static void AddDbContextService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<FactCheckBackDbContext>(op =>
            {
                var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING")
                                       ?? configuration.GetConnectionString("DefaultConnection");

                op.UseNpgsql(connectionString); // for Postgres Connection
                // op.UseSqlServer() // for SQl Server Connection
            });
        }

        private static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserPlanRepository, UserPlanRepository>();
        }

        private static void AddUnitOfWork(this IServiceCollection services)
        {
            services.AddScoped<IFactCheckBackIoW, FactCheckBackIoW>();
        }

        public static void AddDataExtensions(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContextService(configuration);
            services.AddRepositories();
            services.AddUnitOfWork();
        }

    }
}
