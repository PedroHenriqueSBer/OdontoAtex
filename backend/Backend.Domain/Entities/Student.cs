using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.Entities
{
    public class Student : User
    {
        public string Number {  get; set; }
        public string Period { get; set; }
    }
}
