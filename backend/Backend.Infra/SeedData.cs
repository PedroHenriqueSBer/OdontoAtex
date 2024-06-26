using Backend.Domain.Entities;
using Backend.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Infra
{
    public class SeedData
    {
        public static List<User> Users = new() {
            new()
            {
                Disabled = false,
                Email = "adm@adm.com",
                Id = new Guid("00000000-0000-0000-0000-000000000001"),
                Password = "b9dTRAtfpjCeutoajD8pSw==", //senha forte
                Name = "Ademir",
                Type = TypeUser.ADM
            },
            new()
            {
                Disabled = false,
                Email = "professor@professor.com",
                Id = new Guid("00000000-0000-0000-0000-000000000002"),
                Password = "b9dTRAtfpjCeutoajD8pSw==", //senha forte
                Name = "Professor",
                Type = TypeUser.TEACHER
            },
            new()
            {
                Disabled = false,
                Email = "secretaria@secretaria.com",
                Id = new Guid("00000000-0000-0000-0000-000000000003"),
                Password = "b9dTRAtfpjCeutoajD8pSw==", //senha forte
                Name = "Secretaria",
                Type = TypeUser.SECRETARY
            }
        };
        public static List<Student> Students = new() {
            new()
            {
                Disabled = false,
                Email = "aluno@aluno.com",
                Id = new Guid("00000000-0000-0000-0000-000000000004"),
                Password = "b9dTRAtfpjCeutoajD8pSw==", //senha forte
                Name = "Aluno",
                Type = TypeUser.STUDENT,
                Number = "000000000",
                Period = "3"
            }
        };
    }
}
