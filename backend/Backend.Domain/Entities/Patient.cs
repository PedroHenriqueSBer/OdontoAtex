using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.Entities
{
    public class Patient : BaseEntityExtended
    {
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
    }
}
