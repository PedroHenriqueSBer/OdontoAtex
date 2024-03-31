using Backend.Domain.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.Services
{
    public class ResultService<T>
    {
        public static ResultValidator<T> Ok(T Data) => new ResultValidator<T>() { Data = Data, Error = false };
        public static ResultValidator<T> Fail(string? Message) => new ResultValidator<T>() { Error = true, Message = Message };
    }
}
