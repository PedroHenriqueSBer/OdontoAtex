using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infra.Data.Mappings
{
    public class UserMap : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            builder.Property(u => u.Email).HasColumnType("varchar(100)").IsRequired();
            builder.Property(u => u.Password).HasColumnType("varchar(100)").IsRequired();

            builder.HasData(SeedData.Users);
        }
    }
}
