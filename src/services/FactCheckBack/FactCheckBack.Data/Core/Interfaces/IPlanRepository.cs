using FactCheckBack.Models.Entities;

namespace FactCheckBack.Data.Core.Interfaces
{
    public interface IPlanRepository : IBaseRepository<Plan>
    {
        Task<IEnumerable<Plan>> GetWithOptions();
        Task<Plan?> GetByPlanIdAsync(string planId);
    }
}
