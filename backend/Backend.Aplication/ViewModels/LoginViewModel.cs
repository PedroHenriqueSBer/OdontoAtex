using Backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Aplication.ViewModels
{
    public class LoginViewModel
    {
        public string Token { get; set; }
        public UserViewModel? User { get; set; }
        public string RefreshToken { get; set; }

        public LoginViewModel(User? user = null)
        {
            Token = RefreshToken = "";
            User = UserViewModel.FromModel(user);
        }
    }
}
