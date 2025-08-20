using FactCheckBack.Models.Entities;

namespace FactCheckBack.Data.Core.Interfaces
{
    public interface IResultRepository : IBaseRepository<Result>
    {
        Task<IEnumerable<Result>> GetByDateRangeAsync(DateTime startDate, DateTime endDate);
        Task<IEnumerable<Result>> GetByCredibilityRangeAsync(decimal minCredibility, decimal maxCredibility);
    }
}