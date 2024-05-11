using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Infra.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddTypeUsersIntoSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Disabled", "DisabledAt", "Email", "Name", "Password", "Type" },
                values: new object[,]
                {
                    { new Guid("00000000-0000-0000-0000-000000000002"), false, null, "professor@professor.com", "Professor", "b9dTRAtfpjCeutoajD8pSw==", 2 },
                    { new Guid("00000000-0000-0000-0000-000000000003"), false, null, "secretaria@secretaria.com", "Secretaria", "b9dTRAtfpjCeutoajD8pSw==", 3 },
                    { new Guid("00000000-0000-0000-0000-000000000004"), false, null, "aluno@aluno.com", "Aluno", "b9dTRAtfpjCeutoajD8pSw==", 1 }
                });

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "Id", "Number", "Period" },
                values: new object[] { new Guid("00000000-0000-0000-0000-000000000004"), "000000000", "3" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000004"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000002"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000003"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000004"));
        }
    }
}
