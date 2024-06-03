using Backend.Aplication.InputModels;
using Backend.Domain.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Aplication.Services.Interfaces
{
    public interface ISendEmailService
    {
        Task<ResultValidator<string>> SendCodeEmail(SendCodeEmailInputModel input);
    }
}
