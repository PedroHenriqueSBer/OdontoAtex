using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Aplication
{
    public class AppSettings
    {
        public string AUTH_SECRET { get; set; } = "9417cfcbfde35c0a6acfc5592c732c95183501652e5d74b259be5a8841be2703";
        public static string CONNECTION_STRING = "Server=localhost;Port=3306;Database=Unidonto;Uid=root;Pwd=1234;";

    }
}
