using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.Validators
{
    public class ResultValidator<T>
    {
        public T? Data { get; set; }
        public string? Message { get; set; }
        public bool Error { get; set; }
    }
}
