using Backend.Api.Managers;
using Backend.Api.Middlewares;
using Backend.Aplication;
using Backend.Domain.interfaces;
using Backend.Injection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSingleton<ISocketManager, SocketManager>();
builder.Services.AddSwaggerGen();

DependencyInjection.Injections(builder.Services, builder.Configuration.GetConnectionString("Mysql") ?? "");

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseWebSockets();

app.UseMiddleware<SocketMiddleware>();

await ApplicationInjection.Injections(app);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
