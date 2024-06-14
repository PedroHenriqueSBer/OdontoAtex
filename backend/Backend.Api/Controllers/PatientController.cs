using Backend.Aplication.InputModels;
using Backend.Aplication.Services.Interfaces;
using Backend.Aplication.ViewModels;
using Backend.Domain.Validators;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IPatientServices _service;
        public PatientController(IPatientServices service) => _service = service;

        [HttpPost]
        public async Task<ResultValidator<PatientViewModel>> Signup([FromBody] PatientInputModel input) =>
            await _service.Create(input);
    }
}
