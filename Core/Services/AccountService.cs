using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using OAT.Core.Interfaces;
using OAT.Database.Models.Identity;

namespace OAT.Core.Services
{
    public class AccountService : IAccountService
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;
        public AccountService(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
        }

        public async Task<IdentityResult?> CreateUser(string username, string password)
        {
            using var scope = _serviceScopeFactory.CreateScope();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();
            var role = await roleManager.FindByNameAsync("USER");
            role ??= new Role
            {
                Name = username,
                NormalizedName = username.ToUpper()
            };

            var user = new User
            {
                Username = username,
                UserRoles = new List<UserRole>
                    {
                        new UserRole { Role = role }
                    }
            };

            IdentityResult? identityResult = null;
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
            var existingUser = userManager.FindByNameAsync(user.Username).GetAwaiter().GetResult();
            if (existingUser == null)
            {
                var hash = userManager.PasswordHasher.HashPassword(user, password);
                user.PasswordHash = hash;
                identityResult = await userManager.CreateAsync(user);
            }

            return identityResult;
        }
    }
}
