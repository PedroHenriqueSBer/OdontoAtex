using Backend.Infra.Contexts;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Injection
{
    public class ApplicationInjection
    {
        public static void Injections(IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<MysqlContext>();

            try
            {
                if (context != null)
                {
                    context.Database.EnsureCreated();
                    context.Database.Migrate();
                }
            }
            catch (Exception ex) { Console.WriteLine(ex); }
        }
    }
}
