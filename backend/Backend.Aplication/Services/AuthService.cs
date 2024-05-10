using Backend.Aplication.InputModels;
using Backend.Aplication.Services.Interfaces;
using Backend.Aplication.Validators;
using Backend.Aplication.ViewModels;
using Backend.Domain.Entities;
using Backend.Domain.Enum;
using Backend.Domain.Services;
using Backend.Domain.Validators;
using Backend.Infra.Repositories.Interfaces;
using Microsoft.Extensions.Options;

namespace Backend.Aplication.Services
{
    public class AuthService: IAuthService
    {
        private readonly AppSettings _settings;
        private readonly IBaseRepository<User> _repository;
        private readonly IBaseRepository<RefreshToken> _refreshTokens;

        public AuthService(
            IBaseRepository<RefreshToken> refreshTokens,
            IBaseRepository<User> repository,
            IOptions<AppSettings> settings
        )
        {
            _refreshTokens = refreshTokens;
            _settings = settings.Value;
            _repository = repository;
        }

        public async Task<ResultValidator<LoginViewModel>> Login(LoginInputModel input)
        {
            var validationResult = new LoginValidator().Validate(input);
            if (!validationResult.IsValid) return ResultService<LoginViewModel>.Fail("Informações Inválidas");

            var user = await _repository.Get(u => u.Email == input.Email);
            if(user == null)
                return ResultService<LoginViewModel>.Fail("Usuário não encontrado");
            if(user.Password != CryptoService.Encrypt(input.Password))
                return ResultService<LoginViewModel>.Fail("Senha Incorreta");
            if (user.Disabled)
                return ResultService<LoginViewModel>.Fail("Usuário desabilitado");


            var token = TokenService.Generate(user!, _settings.AUTH_SECRET);
            var refreshToken = TokenService.GenerateRefreshToken(user!.Id);

            var refresh = await _refreshTokens.Get(r => r.CreatedById == user!.Id, hasTracking: true);
            if (refresh == null)
                await _refreshTokens.Insert(refreshToken);
            else
            {
                refresh.Token = refreshToken.Token;
                refresh.ExpirationDate = refreshToken.ExpirationDate;
                await _refreshTokens.Update(refresh);
            }

            var res = new LoginViewModel(user)
            {
                Token = token,
                RefreshToken = refreshToken.Token,
            };
            
            return ResultService<LoginViewModel>.Ok(res);

        }

        public async Task<ResultValidator<LoginViewModel>> RefreshToken(string refreshToken)
        {
            var refresh = await _refreshTokens.Get(r => r.Token == refreshToken, include: "CreatedBy");
            if (refresh != null)
            {
                if (refresh.ExpirationDate > DateTime.UtcNow)
                {
                    if (refresh.CreatedBy != null)
                    {
                        var token = TokenService.Generate(refresh.CreatedBy, _settings.AUTH_SECRET);
                        return ResultService<LoginViewModel>.Ok(new(refresh.CreatedBy)
                        {
                            Token = token,
                            RefreshToken = refreshToken
                        });
                    }
                }
                else
                {
                    await _refreshTokens.Delete(r => r.Token == refresh.Token);
                }
            }
            return ResultService<LoginViewModel>.Fail("Token Inválido");
        }
    }
}
