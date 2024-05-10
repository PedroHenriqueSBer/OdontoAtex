using Backend.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Aplication.InputModels
{
    public class RegisterInputModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public TypeUser Type { get; set; }
        public string? Number { get; set; }
        public string? Period { get; set; }
    }
}
