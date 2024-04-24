using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Aplication.InputModels
{
    public class LoginInputModel
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public LoginInputModel()
        {
            Email = Password = "";
        }
    }
}
