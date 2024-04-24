using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Infra.Data.Mappings
{
    public class RefreshTokenMap : IEntityTypeConfiguration<RefreshToken>
    {
        public void Configure(EntityTypeBuilder<RefreshToken> builder)
        {
            builder.ToTable("RefreshTokens");

            builder.Property(r => r.Token).IsRequired();
            builder.Property(r => r.ExpirationDate).IsRequired();
            builder.HasOne(r => r.CreatedBy).WithOne(u => u.RefreshToken).HasForeignKey<RefreshToken>(r => r.CreatedById);
        }
    }
}
