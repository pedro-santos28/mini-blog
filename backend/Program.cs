using System.Text;
using backend.Context;
using backend.DTOs;
using backend.Models;
using backend.Repositories;
using backend.Services;
using Mapster;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the dependency container.
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<UserRepository>();

// Identity dependency injection
builder.Services.AddIdentity<User, UserRole>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddEntityFrameworkStores<ContextDB>()
    .AddDefaultTokenProviders();

//Context dependency injection
builder.Services.AddDbContext<ContextDB>(
  options => options.UseMySql(builder.Configuration.GetConnectionString("ConexaoBanco"),
  ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("ConexaoBanco")))
);

TypeAdapterConfig<User, UserResponseDTO>
            .NewConfig()
            .IgnoreNullValues(true);


builder.Services.AddControllers();

//Adding JWT and setting up the token
// Adding Authentication  
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})


// Adding Jwt Bearer  
.AddJwtBearer(options =>
{

    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],

        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],

        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"])),

        ValidateLifetime = true
    };
});


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

#region [Cors]
builder.Services.AddCors();

app.UseCors(c =>
{
    c.AllowAnyHeader();
    c.AllowAnyMethod();
    c.AllowAnyOrigin();
});
#endregion

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
