using FactCheckBack.Business.Features.Heath.Command;
using FactCheckBack.Business.Features.Plans.PricingQuery;
using LiteBus.Commands.Extensions.MicrosoftDependencyInjection;
using LiteBus.Messaging.Extensions.MicrosoftDependencyInjection;
using LiteBus.Queries.Extensions.MicrosoftDependencyInjection;
using Microsoft.Extensions.DependencyInjection;

namespace FactCheckBack.Business
{
    public static class BusinessExtension
    {
        private static void AddMediator(this IServiceCollection services)
        {
            services.AddLiteBus(l =>
            {
                l.AddCommandModule(module => module.RegisterFromAssembly(typeof(CheckHealthCommandHandler).Assembly));
                l.AddQueryModule(module => module.RegisterFromAssembly(typeof(GetPlansPricingQueryHandler).Assembly));
            });
        }

        public static void AddBusinessExtensions(this IServiceCollection services)
        {
            services.AddMediator();
        }
    }
}
