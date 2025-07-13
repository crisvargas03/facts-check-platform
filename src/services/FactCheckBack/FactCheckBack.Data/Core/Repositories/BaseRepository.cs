using Microsoft.EntityFrameworkCore;
using FactCheckBack.Data.Context;
using FactCheckBack.Data.Core.Exceptions;
using System.Linq.Expressions;
using FactCheckBack.Data.Core.Interfaces;

namespace FactCheckBack.Data.Core.Repositories
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected FactCheckBackDbContext _context;
        protected readonly DbSet<T> _dbSet;

        public BaseRepository(FactCheckBackDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public virtual IEnumerable<T> Search(Expression<Func<T, bool>> expression)
        {
            return _context.Set<T>().Where(expression);
        }
        public virtual IQueryable<T> Query(bool tracked = true)
        {
            return tracked ? _dbSet : _dbSet.AsNoTracking();
        }
        public virtual IQueryable<T> Query(Expression<Func<T, bool>> expression, bool tracked = true)
        {
            var query = _context.Set<T>().Where(expression);
            if (tracked) return query.AsNoTracking();

            return query;
        }
        public virtual async Task<T?> GetByIdAsync(object id)
        {
            try
            {
                return await _dbSet.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new DataException($"Error retrieving entity {typeof(T).Name} by ID", ex);
            }
        }
        public virtual async Task<bool> ExistsAsync(Expression<Func<T, bool>> expression)
        {
            try
            {
                return await _dbSet.AnyAsync(expression);
            }
            catch (Exception ex)
            {
                throw new DataException($"Error checking existence for {typeof(T).Name}", ex);
            }
        }
        
        public virtual async Task CreateAsync(T entity)
        {
            try
            {
                await _dbSet.AddAsync(entity);
            }
            catch (Exception ex)
            {
                throw new DataException($"Error creating entity of type {typeof(T).Name}", ex);
            }
        }
        public virtual async Task CreateCollection(IEnumerable<T> entities)
        {
            try
            {
                await _context.Set<T>().AddRangeAsync(entities);

            }
            catch (Exception ex)
            {
                throw new DataException($"Error Range creating entity of type {typeof(T).Name}", ex);
            }
        }
        public virtual void Update(T entity)
        {
            try
            {
                _dbSet.Update(entity);
            }
            catch (Exception ex)
            {
                throw new DataException($"Error updating entity of type {typeof(T).Name}", ex);
            }
        }
        public virtual void Delete(T entity)
        {
            try
            {
                var entry = _context.Entry(entity);
                if (entry.State == EntityState.Detached)
                {
                    _context.Set<T>().Attach(entity);
                }
                _context.Set<T>().Remove(entity);
            }
            catch (Exception ex)
            {
                throw new DataException($"Error deleting entity of type {typeof(T).Name}", ex);
            }
        }
    }
}
