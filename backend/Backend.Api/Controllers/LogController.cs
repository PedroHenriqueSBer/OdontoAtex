using Backend.Aplication.InputModels;
using Backend.Aplication.Services.Interfaces;
using Backend.Aplication.ViewModels;
using Backend.Domain.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class LogController : ControllerBase
    {
        private readonly ILogService _service;
        public LogController(ILogService service) => _service = service;

        [HttpPost]
        public async Task Insert([FromBody] LogInputModel input) =>
            await _service.Insert(input);

        [HttpGet]
        public async Task<ResultValidator<List<LogViewModel>>> Get() =>
            await _service.GetAll();

    }
}
