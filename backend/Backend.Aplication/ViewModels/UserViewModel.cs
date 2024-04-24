using Backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Aplication.ViewModels
{
    public class UserViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public static UserViewModel FromModel(User input) => new()
        {
            Id = input.Id,
            Name = input.Name,
            Email = input.Email
        };
    }
}
