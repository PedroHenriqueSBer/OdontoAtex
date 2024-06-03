using Backend.Aplication.InputModels;
using Backend.Aplication.Services.Interfaces;
using Backend.Domain.Entities;
using Backend.Domain.Services;
using Backend.Domain.Validators;
using Backend.Infra.Repositories.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Aplication.Services
{
    public class SendEmailService : ISendEmailService
    {
        private readonly IBaseRepository<User> _repositoryUser;
        private readonly AppSettings _settings;
        private readonly IWebHostEnvironment _env;

        public SendEmailService(
            IBaseRepository<User> repositoryUser,
            IWebHostEnvironment env,
            IOptions<AppSettings> settings
        )
        {
            _settings = settings.Value;
            _env = env;
            _repositoryUser = repositoryUser;
        }

        public async Task<ResultValidator<string>> SendCodeEmail(SendCodeEmailInputModel input)
        {
            try
            {
                var user = await _repositoryUser.Get(u => u.Email == input.To);
                if(user == null)
                    return ResultService<string>.Fail("Email inexistente");
                string listChar = "01234567890";
                int passwordLenght = 4;
                Random random = new Random();
                string password = "";

                for (int i = 0; i < passwordLenght; i++)
                {
                    int randomIndex = random.Next(0, listChar.Length);
                    password += listChar[randomIndex];
                }

                var replace = new List<ReplaceObjects>() {
                    new(){
                        New = user.Name,
                        Old = "__USERNAME__"
                    },
                    new(){
                        New = input.Description,
                        Old = "__DESCRIPTION__"
                    },
                    new(){
                        New = password,
                        Old = "__PASSWORD__"
                    }
                };
                EmailService.SendEmail(input.To, input.Subject, Path.Combine(_env.WebRootPath) + "\\Resources\\SendCode.html", replace, _settings.CREDENTIAL);
                return ResultService<string>.Ok(password);
            }
            catch (Exception ex)
            {
                return ResultService<string>.Fail( ex.Message );
            }
        }
    }
}
