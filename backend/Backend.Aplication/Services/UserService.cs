using Backend.Aplication.InputModels;
using Backend.Aplication.Services.Interfaces;
using Backend.Aplication.ViewModels;
using Backend.Domain.Entities;
using Backend.Domain.Enum;
using Backend.Domain.Services;
using Backend.Domain.Validators;
using Backend.Infra.Repositories.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        private readonly Guid userId;

        public UserService(
            IBaseRepository<User> repository,
            IBaseRepository<Student> studentRepository,
            IOptions<AppSettings> settings,
            IWebHostEnvironment env,
            IHttpContextAccessor context
        )
        {
            _settings = settings.Value;
            _repository = repository;
            _studentRepository = studentRepository;
            _env = env;

            var user = context?.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier);
            if (user != null) userId = Guid.Parse(user.Value);
        }

        public async Task<ResultValidator<List<UserViewModel>>> GetAll()
        {
            var users = await _repository.Select(u => u.Type != TypeUser.ADM);
            return ResultService<List<UserViewModel>>.Ok(users.Select(UserViewModel.FromModel).ToList());
        }

        public async Task<ResultValidator<bool>> Disable(Guid id)
        {
            var user = await _repository.Get(id);
            if(user == null)
                return ResultService<bool>.Fail("Usuário inválido");
            user.Disabled = !user.Disabled;
            await _repository.Update(user);
            return ResultService<bool>.Ok(user.Disabled);
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
                var UserWithNumber = await _studentRepository.Get(u => u.Number == input.Number);
                if (UserWithNumber != null)
                    return ResultService<UserViewModel>.Fail("Esta matrícula já está cadastrada");
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
                Log log = new()
                {
                    Title = "Estudante Criado!",
                    Message = $"Estudante {student.Name} Criado",
                    CreatedAt = DateTime.Now,
                    CreatedById = userId,
                    Type = TypeLog.SUCCESS,
                };
                return ResultService<UserViewModel>.Ok(UserViewModel.FromModel(student));
            }
            else
            {
                var user = new User
                {
                    Name = input.Name,
                    Email = input.Email,
                    Password = CryptoService.Encrypt(password),
                    Type = input.Type
                };

                user.Id = await _repository.Insert(user);
                Log log = new()
                {
                    Title = "Usuário Criado!",
                    Message = $"Usuário {user.Name} Criado",
                    CreatedAt = DateTime.Now,
                    CreatedById = userId,
                    Type = TypeLog.SUCCESS,
                };
                var response = UserViewModel.FromModel(user);
                return ResultService<UserViewModel>.Ok(response);
            }
        }

        public async Task<ResultValidator<bool>> ResetPassword(ResetPasswordInputModel input)
        {
            try
            {
                var user = await _repository.Get(u => u.Email == input.Email);
                user.Password = CryptoService.Encrypt(input.Password);
                await _repository.Update(user);
                return ResultService<bool>.Ok(true);
            }
            catch (Exception ex)
            {
                return ResultService<bool>.Fail(ex.Message);
            }
        }
    }
}
