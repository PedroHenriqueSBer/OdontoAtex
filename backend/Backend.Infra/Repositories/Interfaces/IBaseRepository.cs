using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Backend.Infra.Repositories.Interfaces
{
    public interface IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        Task RollbackTransaction();
        Task CommitTransaction();
        Task BeginTransaction();

        Task Attach(TEntity obj);
        Task Detach(TEntity obj);
        IQueryable<TEntity> Query(bool hasTracking = false);
        Task SetState(TEntity obj, EntityState state, bool saveChanges = true);

        Task Delete(Guid id);
        Task Disable(Guid id);
        Task Update(TEntity obj);
        Task Disable(TEntity obj);
        Task<bool> Exists(Guid id);
        Task<Guid> Insert(TEntity obj);
        Task Delete(Expression<Func<TEntity, bool>> predicate);
        Task Disable(Expression<Func<TEntity, bool>> predicate);
        Task<bool> Exists(Expression<Func<TEntity, bool>> predicate);
        Task Update(Expression<Func<TEntity, bool>> predicate, Action<TEntity> changes);

        Task<TEntity?> Get(
            Guid id,
            string? include = null,
            List<Expression<Func<TEntity, dynamic>>>? includes = null,
            bool hasTracking = false
        );
        Task<TEntity?> Get(
            Expression<Func<TEntity, bool>> predicate,
            string? include = null,
            List<Expression<Func<TEntity, dynamic>>>? includes = null,
            bool hasTracking = false
        );
        Task<TResult?> GetDTO<TResult>(
            Expression<Func<TEntity, TResult>> select,
            Expression<Func<TEntity, bool>> predicate,
            string? include = null,
            List<Expression<Func<TEntity, dynamic>>>? includes = null,
            bool hasTracking = false
        );
        Task<IEnumerable<TEntity>> Select(
            Expression<Func<TEntity, bool>>? predicate = null,
            string? include = null,
            List<Expression<Func<TEntity, dynamic>>>? includes = null,
            Queue<OrderField<TEntity, dynamic>>? orderBy = null,
            bool hasTracking = false,
            int page = 1,
            int take = 0
        );
        Task<IEnumerable<TResult>> SelectDTO<TResult>(
            Expression<Func<TEntity, TResult>> select,
            Expression<Func<TEntity, bool>>? predicate = null,
            string? include = null,
            List<Expression<Func<TEntity, dynamic>>>? includes = null,
            Queue<OrderField<TEntity, dynamic>>? orderBy = null,
            bool hasTracking = false,
            int page = 1,
            int take = 0
        );
    }

    public class OrderField<TEntity, TKey>
    {
        public string Direction { get; set; } = "";
        public Expression<Func<TEntity, TKey>> Query { get; set; } = (e) => default;
    }

}
