using Backend.Domain.Entities;
using Backend.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Aplication.ViewModels
{
    public class LogViewModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public TypeLog Type { get; set; }
        public UserViewModel? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }

        public static LogViewModel FromModel(Log input) => new() {
            Id = input.Id,
            Title = input.Title,
            Type = input.Type,
            Message = input.Message,
            CreatedAt = input.CreatedAt,
            CreatedBy = UserViewModel.FromModel(input.CreatedBy),
        };
    }
}
