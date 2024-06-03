using Backend.Aplication.InputModels;
using Backend.Aplication.ViewModels;
using Backend.Domain.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Aplication.Services.Interfaces
{
    public interface IUserService
    {
        Task<ResultValidator<UserViewModel>> Signup(RegisterInputModel input);
        Task<ResultValidator<List<UserViewModel>>> GetAll();
        Task<ResultValidator<bool>> ResetPassword(ResetPasswordInputModel input);
        Task<ResultValidator<bool>> Disable(Guid id);
    }
}
