using Backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Aplication.ViewModels
{
    public class PatientViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Profession { get; set; }
        public string Cpf { get; set; }
        public string Rg { get; set; }
        public string Father { get; set; }
        public string Mother { get; set; }
        public string Phone { get; set; }
        public string RegionalHealthCard { get; set; }
        public string nationalHealthCard { get; set; }
        public string DateOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
        public string State { get; set; }
        public string Address { get; set; }
        public string Number { get; set; }
        public string Neighborhood { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public DateTime CreatedAt { get; private set; }
        public UserViewModel CreatedBy { get; private set; }

        public static PatientViewModel FromModel (Patient input) => new(){
            Id = input.Id,
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
            CreatedAt = input.CreatedAt,
            CreatedBy = UserViewModel.FromModel(input.CreatedBy)
        };
    }
}
