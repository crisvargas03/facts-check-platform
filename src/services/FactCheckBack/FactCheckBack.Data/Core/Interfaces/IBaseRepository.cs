using System.Linq.Expressions;

namespace FactCheckBack.Data.Core.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        Task CreateAsync(T entity);
        Task UpdateAsync(T entity);
        void Delete(T entity);
        Task<bool> ExistsAsync(Expression<Func<T, bool>> filter);
        Task<T?> GetByIdAsync(object id);
        IQueryable<T> Query(bool tracked = true);
        void Update(T entity);
    }
}
