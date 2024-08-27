using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OpenIddict.Abstractions;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;
using OAT.AuthApi.Middleware;
using OAT.Database;
using OAT.Database.Models.Identity;
using OAT.Core.IdentityStores;

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
builder.Services.AddSwaggerGen(
    c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "AuthApi", Version = "v1" });
        c.AddSecurityDefinition(
            "oauth",
            new OpenApiSecurityScheme
            {

                Flows = new OpenApiOAuthFlows
                {
                    ClientCredentials = new OpenApiOAuthFlow
                    {
                        Scopes = new Dictionary<string, string>
                        {
                            ["api"] = "api scope description"
                        },
                        TokenUrl = new Uri("https://demo.identityserver.io/connect/token"),
                    },
                },
                OpenIdConnectUrl = new Uri("/.well-known/openid-configuration", UriKind.Relative),
                In = ParameterLocation.Header,
                Name = HeaderNames.Authorization,
                Type = SecuritySchemeType.OpenIdConnect
            }
        );
        c.AddSecurityRequirement(
            new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                            { Type = ReferenceType.SecurityScheme, Id = "oauth" },
                    },
                    Array.Empty<string>()
                }
            }
        );
    }
);


builder.Services.AddDbContext<DefaultDbContext>(options =>
{
    options.UseSqlServer( builder.Configuration.GetConnectionString("DefaultConnectionString"));
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
        options.SetUserinfoEndpointUris("/connect/userinfo");
        

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

        options.UseAspNetCore().EnableTokenEndpointPassthrough()
            .EnableAuthorizationEndpointPassthrough();
    })
    .AddValidation(options =>
    {
        options.UseLocalServer();
        options.UseAspNetCore();
    });

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = OpenIddictConstants.Schemes.Bearer;
    options.DefaultChallengeScheme = OpenIddictConstants.Schemes.Bearer;
});

builder.Services.AddIdentity<User, Role>()
    .AddSignInManager()
    .AddUserStore<UserStore>()
    .AddRoleStore<RoleStore>()
    .AddUserManager<UserManager<User>>();

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
