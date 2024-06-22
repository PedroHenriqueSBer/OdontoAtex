using Backend.Aplication.InputModels;
using Backend.Aplication.Services.Interfaces;
using Backend.Aplication.ViewModels;
using Backend.Domain.Entities;
using Backend.Domain.Services;
using Backend.Domain.Validators;
using Backend.Infra.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Aplication.Services
{
    public class PatientServices : IPatientServices
    {


        private readonly IBaseRepository<User> _userepository;

        private readonly Guid userId;
        private readonly IBaseRepository<Patient> _repository;
        public PatientServices(
            IBaseRepository<Patient> repository,
            IBaseRepository<User> userepository,
            IHttpContextAccessor context
            )
        {
            var user = context?.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier);
            if (user != null) userId = Guid.Parse(user.Value);

            _repository = repository;
            _userepository = userepository;
        }

        public async Task<ResultValidator<PatientViewModel>> Create (PatientInputModel input)
        {
            var patient = new Patient()
            {
                Name = input.Name,
                Address = input.Address,
                City = input.City,
                Cpf = input.Cpf,
                Father = input.Father,
                Mother = input.Mother,
                nationalHealthCard = input.nationalHealthCard,
                Neighborhood = input.Neighborhood,
                Number = input.Number,
                Phone = input.Phone,
                PlaceOfBirth = input.PlaceOfBirth,
                Profession = input.Profession,
                RegionalHealthCard = input.RegionalHealthCard,
                Rg = input.Rg,
                State = input.State,
                ZipCode = input.ZipCode,
                DateOfBirth = input.DateOfBirth,
                CreatedAt = DateTime.UtcNow,
                CreatedById = userId
            };

            patient.Id = await _repository.Insert(patient);
            patient.CreatedBy = await _userepository.Get(userId);
            return ResultService<PatientViewModel>.Ok(PatientViewModel.FromModel(patient));
        }

    }
}
