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
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        public UserController(IUserService service) => _service = service;

        [HttpPost("signup")]
        public async Task<ResultValidator<UserViewModel>> Signup([FromBody] RegisterInputModel input) =>
            await _service.Signup(input);

        [HttpGet("get-all")]
        public async Task<ResultValidator<List<UserViewModel>>> GetAll() =>
            await _service.GetAll();

        [HttpPut("delete/{id}")]
        public async Task<ResultValidator<bool>> Disable(Guid id) =>
            await _service.Disable(id);
    }
}
