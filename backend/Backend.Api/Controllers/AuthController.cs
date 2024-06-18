using Backend.Aplication.InputModels;
using Backend.Aplication.Services.Interfaces;
using Backend.Aplication.ViewModels;
using Backend.Domain.Services;
using Backend.Domain.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;
        public AuthController(IAuthService service) => _service = service;

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ResultValidator<LoginViewModel>> Login([FromBody] LoginInputModel input) =>
            await _service.Login(input);

        [HttpGet("refresh-token/{input}")]
        public async Task<ResultValidator<LoginViewModel>> RefreshToken(string input) =>
            await _service.RefreshToken(input);

    }
}
