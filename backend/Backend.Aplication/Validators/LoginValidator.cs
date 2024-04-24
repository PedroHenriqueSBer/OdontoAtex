using Backend.Aplication.InputModels;
using FluentValidation;

namespace Backend.Aplication.Validators
{
    public class LoginValidator : AbstractValidator<LoginInputModel>
    {
        public LoginValidator() {
            RuleFor(x => x.Email)
                .NotNull()
                .NotEmpty()
                .EmailAddress();

            RuleFor(x => x.Password)
                .NotNull()
                .NotEmpty()
                .MinimumLength(6);
        }

    }
}
