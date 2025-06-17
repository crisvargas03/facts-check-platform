using FactCheckBack.API.Configurations;
using FactCheckBack.Business;
using FactCheckBack.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// Add DataExtension
builder.Services.AddDataExtensions(builder.Configuration);
// Add BusinessExtension
builder.Services.AddBusinessExtensions();
// Authentication Bearer Config
builder.Services.AddAuthenticationConfiguration(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
