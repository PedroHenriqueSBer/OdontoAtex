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
    public class SendEmailController : ControllerBase
    {
        private readonly ISendEmailService _service;
        public SendEmailController(ISendEmailService service) => _service = service;

        [HttpPost("code")]
        public async Task<ResultValidator<string>> Signup([FromBody] SendCodeEmailInputModel input) =>
            await _service.SendCodeEmail(input);
    }
}
