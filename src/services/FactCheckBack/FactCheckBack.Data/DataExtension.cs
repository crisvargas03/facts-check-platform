using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using FactCheckBack.Data.Context;
using FactCheckBack.Data.Core.UnitOfWork;

namespace FactCheckBack.Data
{
    public static class DataExtension
    {
        private static void AddDbContextService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<FactCheckBackDbContext>(op =>
            {
                var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING")
                                       ?? configuration.GetConnectionString("");
                
                // op.UseNpgsql() for Postgres Connection
                // op.UseSqlServer() for SQl Server Connection
            });
        }

        private static void AddRepositories(this IServiceCollection services)
        {
            // services.AddScoped<IBooksRepository, BooksRepository>();
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
