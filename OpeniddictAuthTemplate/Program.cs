using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using OAT.AuthApi.Config;
using OAT.AuthApi.Middleware;
using OAT.Core.IdentityStores;
using OAT.Core.Interfaces;
using OAT.Core.Services;
using OAT.Database;
using OAT.Database.Models.Identity;
using OpenIddict.Abstractions;
using OpenIddict.Validation.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Auth API", Version = "v1" });
    options.DocumentFilter<SwaggerDocumentFilter>();
    options.AddSecurityDefinition("Bearer",
        new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Put 'Bearer <your_access_token>'",
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey
        });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
    });
});

builder.Services.AddDbContext<DefaultDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionString"));
    options.UseOpenIddict();
});

builder.Services.Configure<IdentityOptions>(options =>
{
    options.ClaimsIdentity.UserNameClaimType = OpenIddictConstants.Claims.Name;
    options.ClaimsIdentity.UserIdClaimType = OpenIddictConstants.Claims.Subject;
    options.ClaimsIdentity.RoleClaimType = OpenIddictConstants.Claims.Role;
});

builder.Services.AddOpenIddict()
    .AddCore(options => options.UseEntityFrameworkCore().UseDbContext<DefaultDbContext>())
    .AddServer(options =>
    {
        options.SetTokenEndpointUris("/connect/token");
        options.SetLogoutEndpointUris("/connect/logout");
        options.AllowPasswordFlow();
        options.AllowRefreshTokenFlow();
        options.UseReferenceAccessTokens();
        options.UseReferenceRefreshTokens();


        options.RegisterScopes(OpenIddictConstants.Permissions.Scopes.Email,
                        OpenIddictConstants.Permissions.Scopes.Profile,
                        OpenIddictConstants.Permissions.Scopes.Roles);


        int accessTokenLifetime = builder.Configuration.GetValue<int?>("AccessTokenLifetimeInDays") ?? 7;
        int refreshTokenLifetime = builder.Configuration.GetValue<int?>("RefreshTokenLifetimeInMinutes") ?? 30;

        options.SetAccessTokenLifetime(TimeSpan.FromMinutes(accessTokenLifetime));
        options.SetRefreshTokenLifetime(TimeSpan.FromDays(refreshTokenLifetime));

        options.AddDevelopmentEncryptionCertificate()
            .AddDevelopmentSigningCertificate();

        options.UseAspNetCore()
            .EnableTokenEndpointPassthrough()
            .EnableAuthorizationEndpointPassthrough()
            .EnableLogoutEndpointPassthrough();
    })
    .AddValidation(options =>
    {
        options.UseLocalServer();
        options.UseAspNetCore();
        options.UseSystemNetHttp();
    });

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = OpenIddictConstants.Schemes.Bearer;
    options.DefaultAuthenticateScheme = OpenIddictConstants.Schemes.Bearer;
    options.DefaultChallengeScheme = OpenIddictConstants.Schemes.Bearer;

});


builder.Services.AddAuthorization(options =>
{
    var defaultAuthorizationPolicyBuilder = new AuthorizationPolicyBuilder(
        OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme);
    defaultAuthorizationPolicyBuilder =
        defaultAuthorizationPolicyBuilder.RequireAuthenticatedUser();
    options.DefaultPolicy = defaultAuthorizationPolicyBuilder.Build();
});


builder.Services.AddIdentity<User, Role>()
    .AddSignInManager()
    .AddUserStore<UserStore>()
    .AddRoleStore<RoleStore>()
    .AddUserManager<UserManager<User>>();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IAccountService, AccountService>();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseMiddleware<DataInitializationMiddleware>();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
