using Backend.Aplication.InputModels;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Aplication.Validators
{
    public class RegisterValidator : AbstractValidator<RegisterInputModel>
    {
        public RegisterValidator()
        {
            RuleFor(x => x.Email)
                .NotNull()
                .NotEmpty()
                .EmailAddress();

            RuleFor(x => x.Password)
                .NotNull()
                .NotEmpty()
                .MinimumLength(6);

            RuleFor(x => x.Name)
                .NotNull()
                .NotEmpty()
                .MinimumLength(6);
        }

    }
}
