using FactCheckBack.API.Configurations;
using FactCheckBack.Business;
using FactCheckBack.Business.Services.Jwt;
using FactCheckBack.Data;
using FactCheckBack.Data.Context;
using FactCheckBack.Data.Core.Interfaces;
using FactCheckBack.Data.Core.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DataExtension
builder.Services.AddDataExtensions(builder.Configuration);
// Add BusinessExtension
builder.Services.AddBusinessExtensions();
// Add Configs
builder.Services.AddAuthenticationConfiguration(builder.Configuration);


builder.Services.AddScoped<IJwtService, JwtService>();

builder.Services.AddScoped<IArticleInputRepository>(provider =>
{
    var context = provider.GetRequiredService<FactCheckBackDbContext>();
    var httpClientFactory = provider.GetRequiredService<IHttpClientFactory>();
    var configuration = provider.GetRequiredService<IConfiguration>();

    return new ArticleInputRepository(context, httpClientFactory.CreateClient(), configuration);
});

builder.Services.AddHttpClient();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors("cors");

app.MapControllers();

app.Run();
