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
        public static List<User> Users = new List<User>() {
            new()
            {
                Disabled = false,
                Email = "adm@adm.com",
                Id = new Guid("00000000-0000-0000-0000-000000000001"),
                Password = "b9dTRAtfpjCeutoajD8pSw==", //senha forte
                Name = "Ademir",
                Type = TypeUser.ADM
            }
        };
    }
}
