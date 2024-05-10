using Backend.Domain.Entities;
using Backend.Infra.Repositories.Interfaces;
using Backend.Infra.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Backend.Infra.Contexts;
using Microsoft.EntityFrameworkCore;
using Backend.Aplication;
using Backend.Aplication.Services;
using Backend.Aplication.Services.Interfaces;

namespace Backend.Injection
{
    public class DependencyInjection
    {
        public static void Injections(IServiceCollection services, string connectionString)
        {
            
            var serviceProvider = services.BuildServiceProvider();
            var _settings = serviceProvider.GetService<IOptions<AppSettings>>()?.Value;

            services
                .AddScoped<IBaseRepository<Student>, BaseRepository<Student>>()
                .AddScoped<IBaseRepository<Log>, BaseRepository<Log>>()
                .AddScoped<IBaseRepository<RefreshToken>, BaseRepository<RefreshToken>>()
                .AddScoped<IBaseRepository<User>, BaseRepository<User>>();
            
            services
                .AddScoped<IUserService, UserService>()
                .AddScoped<IAuthService, AuthService>();

            services.AddDbContext<MysqlContext>(options =>
            {
                options.UseMySQL(connectionString);
                options.EnableSensitiveDataLogging();
            }, ServiceLifetime.Scoped);

            services
               .AddOptions()
               .AddHttpContextAccessor();


            if (!string.IsNullOrEmpty(_settings?.AUTH_SECRET))
            {
                var key = Encoding.ASCII.GetBytes(_settings.AUTH_SECRET);

                services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                    .AddJwtBearer(x =>
                    {
                        x.RequireHttpsMetadata = false;
                        x.SaveToken = true;
                        x.TokenValidationParameters = new TokenValidationParameters
                        {
                            ClockSkew = TimeSpan.Zero,
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = new SymmetricSecurityKey(key),
                            ValidateIssuer = false,
                            ValidateAudience = false
                        };
                    });
            }
        }
    }
}
