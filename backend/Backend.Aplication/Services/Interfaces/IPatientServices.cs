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
    public interface IPatientServices
    {
        Task<ResultValidator<PatientViewModel>> Create(PatientInputModel input);
        Task<ResultValidator<List<PatientViewModel>>> GetAll();
    }
}
