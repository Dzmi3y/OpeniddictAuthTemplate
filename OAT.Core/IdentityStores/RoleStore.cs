using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OAT.Database;
using OAT.Database.Models.Identity;

namespace OAT.Core.IdentityStores
{
    public class RoleStore : IRoleStore<Role>
    {
        private readonly DefaultDbContext _context;

        public RoleStore(DefaultDbContext context)
        {
            _context = context;
        }

        public async Task<IdentityResult> CreateAsync(Role role, CancellationToken cancellationToken)
        {
            _context.Roles.Add(role);
            await _context.SaveChangesAsync(cancellationToken);
            return IdentityResult.Success;
        }

        public Task<IdentityResult> DeleteAsync(Role role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
        }

        public async Task<Role?> FindByIdAsync(string roleId, CancellationToken cancellationToken)
        {
            return await _context.Roles
                .Include(r => r.UserRoles)
                .ThenInclude(ur => ur.User)
                .SingleOrDefaultAsync(r => r.Id.ToString() == roleId, cancellationToken); ;
        }

        public async Task<Role?> FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken)
        {
            return await _context.Roles
                .Include(r => r.UserRoles)
                .ThenInclude(ur => ur.User)
                .SingleOrDefaultAsync(r => r.NormalizedName == normalizedRoleName,
                    cancellationToken);
        }

        public Task<string> GetNormalizedRoleNameAsync(Role role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetRoleIdAsync(Role role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetRoleNameAsync(Role role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetNormalizedRoleNameAsync(Role role, string normalizedName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetRoleNameAsync(Role role, string roleName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IdentityResult> UpdateAsync(Role role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
