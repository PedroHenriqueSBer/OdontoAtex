using Backend.Aplication.InputModels;
using Backend.Aplication.ViewModels;
using Backend.Domain.Services;
using Backend.Domain.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Aplication.Services.Interfaces
{
    public interface IAuthService
    {
        Task<ResultValidator<LoginViewModel>> Login(LoginInputModel input);
        Task<ResultValidator<LoginViewModel>> Signup(RegisterInputModel input);
        Task<ResultValidator<LoginViewModel>> RefreshToken(string refreshToken);
    }
}
