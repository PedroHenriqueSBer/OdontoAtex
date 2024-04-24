using Backend.Domain.Entities;
using Backend.Infra.Contexts;
using Backend.Infra.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Backend.Infra.Repositories
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity, new()
    {

        protected readonly MysqlContext _context;
        public BaseRepository(MysqlContext context) { _context = context; }

        public async Task RollbackTransaction() => await _context.Database.RollbackTransactionAsync();

        public async Task CommitTransaction() => await _context.Database.CommitTransactionAsync();

        public async Task BeginTransaction() => await _context.Database.BeginTransactionAsync();

        public IQueryable<TEntity> Query(bool hasTracking = false) =>
            _context
            .Set<TEntity>()
            .WithTracking(hasTracking);

        public async Task SetState(TEntity obj, EntityState state, bool saveChanges = true)
        {
            _context.Entry(obj).State = state;
            if (saveChanges) await _context.SaveChangesAsync();
        }

        public Task Attach(TEntity obj) => Task.FromResult(_context.Attach(obj));

        public Task Detach(TEntity obj) => SetState(obj, EntityState.Detached);


        public async Task<Guid> Insert(TEntity obj)
        {
            _context.Add(obj);
            await _context.SaveChangesAsync();
            return obj.Id;
        }

        public async Task Update(TEntity obj) => await SetState(obj, EntityState.Modified);
        public async Task Update(Expression<Func<TEntity, bool>> predicate, Action<TEntity> changes)
        {
            var results = Query(true).Where(predicate).ToList();
            results.ForEach(changes);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Guid id)
        {
            var tracking = _context.ChangeTracker.Entries<TEntity>().FirstOrDefault(x => x.Entity.Id == id)?.Entity;
            if (tracking != null) await SetState(tracking, EntityState.Deleted);
            else
            {
                TEntity obj = new() { Id = id };
                _context.Remove(obj);
            }

            await _context.SaveChangesAsync();
        }

        public async Task Delete(Expression<Func<TEntity, bool>> predicate)
        {
            Guid objId = await GetDTO(obj => obj.Id, predicate);
            await Delete(objId);
        }

        public async Task<bool> Exists(Guid id) => await Exists(obj => obj.Id == id);
        public async Task<bool> Exists(Expression<Func<TEntity, bool>> predicate) =>
            await _context.Set<TEntity>().AnyAsync(predicate);

        public async Task Disable(Guid id)
        {
            var obj = await Get(id);
            if (obj == null) return;
            obj.Disabled = true;
            obj.DisabledAt = DateTime.UtcNow;
            await Update(obj);
        }

        public async Task Disable(TEntity obj)
        {
            obj.Disabled = true;
            obj.DisabledAt = DateTime.UtcNow;
            await Update(obj);
        }

        public async Task Disable(Expression<Func<TEntity, bool>> predicate)
        {
            var obj = await Get(predicate);
            if (obj == null) return;
            obj.Disabled = true;
            obj.DisabledAt = DateTime.UtcNow;
            await Update(obj);
        }


        public Task<TEntity?> Get(
            Guid id,
            string? include = null,
            List<Expression<Func<TEntity, dynamic>>>? includes = null,
            bool hasTracking = false
        ) => Get(obj => obj.Id == id, include, includes, hasTracking);

        public async Task<TEntity?> Get(
            Expression<Func<TEntity, bool>> predicate,
            string? include = null,
            List<Expression<Func<TEntity, dynamic>>>? includes = null,
            bool hasTracking = false
        ) => await _context
            .Set<TEntity>()
            .WithTracking(hasTracking)
            .WithStringInclude(include)
            .WithIncludes(includes)
            .FirstOrDefaultAsync(predicate);

        public async Task<TResult?> GetDTO<TResult>(
            Expression<Func<TEntity, TResult>> select,
            Expression<Func<TEntity, bool>> predicate,
            string? include = null,
            List<Expression<Func<TEntity, dynamic>>>? includes = null,
            bool hasTracking = false
        ) => await _context.Set<TEntity>()
            .WithTracking(hasTracking)
            .WithStringInclude(include)
            .WithIncludes(includes)
            .Where(predicate)
            .Select(select)
            .FirstOrDefaultAsync();

        public async Task<IEnumerable<TEntity>> Select(
            Expression<Func<TEntity, bool>>? predicate = null,
            string? include = null,
            List<Expression<Func<TEntity, dynamic>>>? includes = null,
            Queue<OrderField<TEntity, dynamic>>? orderBy = null,
            bool hasTracking = false,
            int page = 1,
            int take = 0
        ) => await _context.Set<TEntity>()
            .WithTracking(hasTracking)
            .WithStringInclude(include)
            .WithIncludes(includes)
            .Where(predicate ?? (obj => true))
            .WithOrder(orderBy)
            .Skip(take * (page - 1))
            .Take(take == 0 ? int.MaxValue : take)
            .ToListAsync();

        public async Task<IEnumerable<TResult>> SelectDTO<TResult>(
            Expression<Func<TEntity, TResult>> select,
            Expression<Func<TEntity, bool>>? predicate = null,
            string? include = null,
            List<Expression<Func<TEntity, dynamic>>>? includes = null,
            Queue<OrderField<TEntity, dynamic>>? orderBy = null,
            bool hasTracking = false,
            int page = 1,
            int take = 0
        ) => await _context.Set<TEntity>()
            .WithTracking(hasTracking)
            .WithStringInclude(include)
            .WithIncludes(includes)
            .Where(predicate ?? (obj => true))
            .WithOrder(orderBy)
            .Select(select)
            .Skip(take * (page - 1))
            .Take(take == 0 ? int.MaxValue : take)
            .ToListAsync();
    }

    public static class BaseRepositoryExtension
    {
        public static IQueryable<TEntity> WithTracking<TEntity>(
            this IQueryable<TEntity> query,
            bool hasTracking
        ) where TEntity : BaseEntity => hasTracking ? query : query.AsNoTracking();

        public static IQueryable<TEntity> WithStringInclude<TEntity>(
            this IQueryable<TEntity> query,
            string? include = null
        ) where TEntity : BaseEntity
        {
            if (!string.IsNullOrEmpty(include))
            {
                foreach (var includeProperty in include.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty.Trim());
                }
            }

            return query.AsSplitQuery();
        }

        public static IQueryable<TEntity> WithIncludes<TEntity>(
            this IQueryable<TEntity> query,
            IList<Expression<Func<TEntity, dynamic>>>? includes
        ) where TEntity : BaseEntity
        {
            if (includes != null)
            {
                foreach (Expression<Func<TEntity, dynamic>>? include in includes)
                {
                    query = query.Include(include);
                }
            }

            return query.AsSplitQuery();
        }

        public static IQueryable<TEntity> WithOrder<TEntity, TKey>(
            this IQueryable<TEntity> query,
            Queue<OrderField<TEntity, TKey>>? orderBy = null) where TEntity : BaseEntity
        {
            if (orderBy != null && orderBy.Count > 0)
            {
                IOrderedQueryable<TEntity> orderedQuery;
                var order = orderBy.Dequeue();

                if (order != null)
                {
                    orderedQuery = order.Direction == "asc" ?
                        query.OrderBy(order.Query) :
                        query.OrderByDescending(order.Query);

                    foreach (var thenBy in orderBy)
                    {
                        orderedQuery = thenBy.Direction == "asc" ?
                            orderedQuery.ThenBy(thenBy.Query) :
                            orderedQuery.ThenByDescending(thenBy.Query);
                    }

                    query = orderedQuery;
                }
            }

            return query;
        }
    }

}
