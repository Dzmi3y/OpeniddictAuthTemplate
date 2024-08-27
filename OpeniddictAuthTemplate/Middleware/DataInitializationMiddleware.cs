using Microsoft.AspNetCore.Identity;
using OAT.AuthApi.Config;
using OAT.Database;
using OAT.Database.Models.Identity;
using OpenIddict.Abstractions;

namespace OAT.AuthApi.Middleware
{
    public class DataInitializationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly IConfiguration _configuration;

        public DataInitializationMiddleware(RequestDelegate next, IServiceScopeFactory serviceScopeFactory,
            IConfiguration configuration)
        {
            _next = next;
            _serviceScopeFactory = serviceScopeFactory;
            _configuration = configuration;
        }

        private async Task CreateSeedUser()
        {
            var initUser = _configuration.GetSection("InitUser").Get<InitUser>();
            if (initUser != null)
            {
                using var scope = _serviceScopeFactory.CreateScope();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();
                var role = await roleManager.FindByNameAsync(initUser.NormalizedRoleName);
                role ??= new Role
                {
                    Name = initUser.RoleName,
                    NormalizedName = initUser.NormalizedRoleName
                };

                var user = new User
                {
                    Username = initUser.UserName,
                    UserRoles = new List<UserRole>
                        {
                            new UserRole { Role = role }
                        }
                };

                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var existingUser = userManager.FindByNameAsync(user.Username).GetAwaiter().GetResult();
                if (existingUser == null)
                {
                    var hash = userManager.PasswordHasher.HashPassword(user, initUser.Password);
                    user.PasswordHash = hash;
                    userManager.CreateAsync(user).GetAwaiter().GetResult();
                }
            }
        }

        public async Task InvokeAsync(HttpContext context)
        {
            using var scope = _serviceScopeFactory.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<DefaultDbContext>();
            dbContext.Database.EnsureCreated();

            var manager = scope.ServiceProvider.GetRequiredService<IOpenIddictApplicationManager>();
            var initOpenIddictAppData = _configuration.GetSection("InitOpenIddictAppData")
                .Get<InitOpenIddictAppData>();
            var existingClientApp = manager.FindByClientIdAsync(initOpenIddictAppData.ClientId).GetAwaiter().GetResult();
            if (existingClientApp == null)
            {
                manager.CreateAsync(new OpenIddictApplicationDescriptor
                {
                    ClientId = initOpenIddictAppData.ClientId,
                    ClientSecret = initOpenIddictAppData.ClientSecret,
                    DisplayName = initOpenIddictAppData.DisplayName,
                    Permissions =
                    {
                        OpenIddictConstants.Permissions.Endpoints.Token,
                        OpenIddictConstants.Permissions.GrantTypes.Password
                    }
                }).GetAwaiter().GetResult();
            }

            CreateSeedUser();


            await _next(context);
        }

    }
}
