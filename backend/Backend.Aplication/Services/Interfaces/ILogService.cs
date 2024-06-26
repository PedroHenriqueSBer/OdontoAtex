using Backend.Aplication.InputModels;
using Backend.Aplication.ViewModels;
using Backend.Domain.Enum;
using Backend.Domain.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Aplication.Services.Interfaces
{
    public interface ILogService
    {
        Task<ResultValidator<List<LogViewModel>>> GetAll();
        Task Insert(LogInputModel input);
    }
}
