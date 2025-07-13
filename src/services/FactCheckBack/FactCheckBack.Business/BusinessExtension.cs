using LiteBus.Commands.Extensions.MicrosoftDependencyInjection;
using LiteBus.Messaging.Extensions.MicrosoftDependencyInjection;
using LiteBus.Queries.Extensions.MicrosoftDependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using FactCheckBack.Business.Features.Heath.Command;

namespace FactCheckBack.Business
{
    public static class BusinessExtension
    {
        private static void AddMediator(this IServiceCollection services)
        {
            services.AddLiteBus(l =>
            {
                l.AddCommandModule(module => module.RegisterFromAssembly(typeof(CheckHealthCommandHandler).Assembly));
                // l.AddQueryModule(module => module.RegisterFromAssembly(typeof().Assembly));
            });
        }

        public static void AddBusinessExtensions(this IServiceCollection services)
        {
            services.AddMediator();
        }
    }
}
