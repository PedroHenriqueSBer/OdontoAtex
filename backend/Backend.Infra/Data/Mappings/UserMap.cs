using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend.Domain.Services;

namespace Backend.Infra.Data.Mappings
{
    public class UserMap : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            builder.Property(u => u.Email).HasColumnType("varchar(100)").IsRequired();
            builder.Property(u => u.Password).HasColumnType("varchar(100)").IsRequired();

            builder.HasData(new List<User>() {
                new()
                {
                    Disabled = false,
                    Email = "adm@adm.com",
                    Id = new Guid("00000000-0000-0000-0000-000000000001"),
                    Password = "b9dTRAtfpjCeutoajD8pSw==", //senha forte
                    Name = "Ademir",
                }
            });
        }
    }
}
