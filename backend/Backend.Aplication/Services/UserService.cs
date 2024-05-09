using Backend.Aplication.InputModels;
using Backend.Aplication.Services.Interfaces;
using Backend.Aplication.ViewModels;
using Backend.Domain.Entities;
using Backend.Domain.Enum;
using Backend.Domain.Services;
using Backend.Domain.Validators;
using Backend.Infra.Repositories.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Aplication.Services
{
    public class UserService : IUserService
    {

        private readonly IBaseRepository<User> _repository;
        private readonly IBaseRepository<Student> _studentRepository;
        private readonly AppSettings _settings;
        private readonly IWebHostEnvironment _env;
        public UserService(
            IBaseRepository<User> repository,
            IBaseRepository<Student> studentRepository,
            IOptions<AppSettings> settings,
            IWebHostEnvironment env
        )
        {
            _settings = settings.Value;
            _repository = repository;
            _studentRepository = studentRepository;
            _env = env;
        }

        public async Task<ResultValidator<UserViewModel>> Signup(RegisterInputModel input)
        {
            var UserWithEmail = await _repository.Get(u => u.Email == input.Email);
            if (UserWithEmail != null)
                return ResultService<UserViewModel>.Fail("Este E-mail já está cadastrado");

            string listChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            int passwordLenght = 10;
            Random random = new Random();
            string password = "";

            for (int i = 0; i < passwordLenght; i++)
            {
                int randomIndex = random.Next(0, listChar.Length);
                password += listChar[randomIndex];
            }

            var replace = new List<ReplaceObjects>() {
                new(){
                    New = input.Name,
                    Old = "__USERNAME__"
                },
                new(){
                    New = _settings.URL,
                    Old = "__LINK__"
                },
                new(){
                    New = password,
                    Old = "__PASSWORD__"
                }
            };

            EmailService.SendEmail(input.Email, "Bem Vindo Ao Byte&Bite", Path.Combine(_env.WebRootPath) + "\\Resources\\SendPassword.html", replace, _settings.CREDENTIAL);

            if (input.Type == TypeUser.STUDENT)
            {
                var student = new Student
                {
                    Name = input.Name,
                    Email = input.Email,
                    Type = input.Type,
                    Password = CryptoService.Encrypt(password),
                    Number = input.Number,
                    Period = input.Period,
                };

                student.Id = await _studentRepository.Insert(student);
                return ResultService<UserViewModel>.Ok(UserViewModel.FromModel(student));
            }
            else
            {
                var user = new User
                {
                    Name = input.Name,
                    Email = input.Email,
                    Password = CryptoService.Encrypt(password),
                };

                user.Id = await _repository.Insert(user);
                var response = UserViewModel.FromModel(user);
                return ResultService<UserViewModel>.Ok(response);
            }
        }
    }
}
