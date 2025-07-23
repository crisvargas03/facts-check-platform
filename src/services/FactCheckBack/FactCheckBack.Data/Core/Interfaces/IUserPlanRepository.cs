using FactCheckBack.Models.Entities;

namespace FactCheckBack.Data.Core.Interfaces
{
    public interface IUserPlanRepository : IBaseRepository<User_plan>
    {
        Task<User_plan?> GetByUserIdAsync(string userId);
    }
}
