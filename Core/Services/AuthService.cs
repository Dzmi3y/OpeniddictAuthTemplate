using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using OAT.Core.Interfaces;
using OAT.Database.Models.Identity;
using OpenIddict.Abstractions;
using OpenIddict.Core;
using OpenIddict.EntityFrameworkCore.Models;
using System.Security.Claims;


namespace OAT.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly OpenIddictTokenManager<OpenIddictEntityFrameworkCoreToken> _openIddictTokenManager;

        public AuthService(UserManager<User> userManager, SignInManager<User> signInManager,
            OpenIddictTokenManager<OpenIddictEntityFrameworkCoreToken> openIddictTokenManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _openIddictTokenManager = openIddictTokenManager;
        }

        public async Task<ClaimsPrincipal?> GetClaimsPrincipalByPasswordGrantType(OpenIddictRequest request)
        {
            var user = await _userManager.FindByNameAsync(request.Username);
            if (user == null)
                return null;

            var signInResult = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
            if (signInResult.Succeeded)
            {
                var identity = new ClaimsIdentity(
                    TokenValidationParameters.DefaultAuthenticationType,
                    OpenIddictConstants.Claims.Name,
                    OpenIddictConstants.Claims.Role);


                identity.AddClaim(OpenIddictConstants.Claims.Subject, user.Id.ToString(), OpenIddictConstants.Destinations.AccessToken);
                identity.AddClaim(OpenIddictConstants.Claims.Name, user.Username, OpenIddictConstants.Destinations.AccessToken);
                foreach (var userRole in user.UserRoles)
                {
                    identity.AddClaim(OpenIddictConstants.Claims.Role, userRole.Role.NormalizedName, OpenIddictConstants.Destinations.AccessToken);
                }

                var claimsPrincipal = new ClaimsPrincipal(identity);
                claimsPrincipal.SetScopes(new string[]
                {
                    OpenIddictConstants.Scopes.Roles,
                    OpenIddictConstants.Scopes.OfflineAccess,
                    OpenIddictConstants.Scopes.Email,
                    OpenIddictConstants.Scopes.Profile
                });


                claimsPrincipal.SetDestinations(claim =>
                {
                    switch (claim.Type)
                    {
                        case OpenIddictConstants.Claims.Subject:
                        case OpenIddictConstants.Claims.Name:
                        case OpenIddictConstants.Claims.Role:
                            return new[] { OpenIddictConstants.Destinations.AccessToken, OpenIddictConstants.Destinations.IdentityToken };
                        default:
                            return new[] { OpenIddictConstants.Destinations.AccessToken };
                    }
                });






                return claimsPrincipal;
            }
            else
                return null;
        }

        public async Task RevokeTokensAsync(string userId)
        {
            var tokens =  
                _openIddictTokenManager.FindBySubjectAsync(userId);

            await foreach (var token in tokens)
            {
                await _openIddictTokenManager.TryRevokeAsync(token);
            }
        }
    }
}
