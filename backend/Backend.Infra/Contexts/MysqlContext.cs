using Microsoft.EntityFrameworkCore;

namespace Backend.Infra.Contexts
{
    public class MysqlContext: DbContext
    {
        public MysqlContext(DbContextOptions<MysqlContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(MysqlContext).Assembly);
        }
    }
}
