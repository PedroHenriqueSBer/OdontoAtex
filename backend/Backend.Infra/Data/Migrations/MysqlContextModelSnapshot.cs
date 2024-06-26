﻿// <auto-generated />
using System;
using Backend.Infra.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend.Infra.Data.Migrations
{
    [DbContext(typeof(MysqlContext))]
    partial class MysqlContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Backend.Domain.Entities.Log", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("CreatedById")
                        .HasColumnType("char(36)");

                    b.Property<bool>("Disabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime?>("DisabledAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid?>("UpdatedById")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("UpdatedById");

                    b.ToTable("Logs", (string)null);
                });

            modelBuilder.Entity("Backend.Domain.Entities.Patient", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Cpf")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("CreatedById")
                        .HasColumnType("char(36)");

                    b.Property<string>("DateOfBirth")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("Disabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime?>("DisabledAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Father")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Mother")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Neighborhood")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Number")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PlaceOfBirth")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Profession")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("RegionalHealthCard")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Rg")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid?>("UpdatedById")
                        .HasColumnType("char(36)");

                    b.Property<string>("ZipCode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("nationalHealthCard")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("UpdatedById");

                    b.ToTable("Patients", (string)null);
                });

            modelBuilder.Entity("Backend.Domain.Entities.RefreshToken", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("CreatedById")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("ExpirationDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid?>("UpdatedById")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById")
                        .IsUnique();

                    b.HasIndex("UpdatedById");

                    b.ToTable("RefreshTokens", (string)null);
                });

            modelBuilder.Entity("Backend.Domain.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<bool>("Disabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime?>("DisabledAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Users", (string)null);

                    b.UseTptMappingStrategy();

                    b.HasData(
                        new
                        {
                            Id = new Guid("00000000-0000-0000-0000-000000000001"),
                            Disabled = false,
                            Email = "adm@adm.com",
                            Name = "Ademir",
                            Password = "b9dTRAtfpjCeutoajD8pSw==",
                            Type = 0
                        },
                        new
                        {
                            Id = new Guid("00000000-0000-0000-0000-000000000002"),
                            Disabled = false,
                            Email = "professor@professor.com",
                            Name = "Professor",
                            Password = "b9dTRAtfpjCeutoajD8pSw==",
                            Type = 2
                        },
                        new
                        {
                            Id = new Guid("00000000-0000-0000-0000-000000000003"),
                            Disabled = false,
                            Email = "secretaria@secretaria.com",
                            Name = "Secretaria",
                            Password = "b9dTRAtfpjCeutoajD8pSw==",
                            Type = 3
                        });
                });

            modelBuilder.Entity("Backend.Domain.Entities.Student", b =>
                {
                    b.HasBaseType("Backend.Domain.Entities.User");

                    b.Property<string>("Number")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Period")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.ToTable("Student", (string)null);

                    b.HasData(
                        new
                        {
                            Id = new Guid("00000000-0000-0000-0000-000000000004"),
                            Disabled = false,
                            Email = "aluno@aluno.com",
                            Name = "Aluno",
                            Password = "b9dTRAtfpjCeutoajD8pSw==",
                            Type = 1,
                            Number = "000000000",
                            Period = "3"
                        });
                });

            modelBuilder.Entity("Backend.Domain.Entities.Log", b =>
                {
                    b.HasOne("Backend.Domain.Entities.User", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Domain.Entities.User", "UpdatedBy")
                        .WithMany()
                        .HasForeignKey("UpdatedById");

                    b.Navigation("CreatedBy");

                    b.Navigation("UpdatedBy");
                });

            modelBuilder.Entity("Backend.Domain.Entities.Patient", b =>
                {
                    b.HasOne("Backend.Domain.Entities.User", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Domain.Entities.User", "UpdatedBy")
                        .WithMany()
                        .HasForeignKey("UpdatedById");

                    b.Navigation("CreatedBy");

                    b.Navigation("UpdatedBy");
                });

            modelBuilder.Entity("Backend.Domain.Entities.RefreshToken", b =>
                {
                    b.HasOne("Backend.Domain.Entities.User", "CreatedBy")
                        .WithOne("RefreshToken")
                        .HasForeignKey("Backend.Domain.Entities.RefreshToken", "CreatedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Domain.Entities.User", "UpdatedBy")
                        .WithMany()
                        .HasForeignKey("UpdatedById");

                    b.Navigation("CreatedBy");

                    b.Navigation("UpdatedBy");
                });

            modelBuilder.Entity("Backend.Domain.Entities.Student", b =>
                {
                    b.HasOne("Backend.Domain.Entities.User", null)
                        .WithOne()
                        .HasForeignKey("Backend.Domain.Entities.Student", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Backend.Domain.Entities.User", b =>
                {
                    b.Navigation("RefreshToken");
                });
#pragma warning restore 612, 618
        }
    }
}
