using Backend.Domain.Entities;
using Backend.Domain.Enum;

namespace Backend.Aplication.ViewModels
{
    public class UserViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public TypeUser Type { get; set; }

        public static UserViewModel FromModel(User input) => new()
        {
            Id = input.Id,
            Name = input.Name,
            Email = input.Email,
            Type = input.Type,
        };
    }
}
