using Backend.Infra.Contexts;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.Injection
{
    public class ApplicationInjection
    {
        public static async Task Injections(IApplicationBuilder app)
        {
            try
            {
                using var scope = app.ApplicationServices.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<MysqlContext>();
                await context.Database.MigrateAsync();
            }
            catch (Exception ex) { Console.WriteLine(ex); }
        }
    }
}
