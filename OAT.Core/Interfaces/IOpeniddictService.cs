using OpenIddict.Abstractions;
using System.Security.Claims;

namespace OAT.Core.Interfaces
{
    public interface IOpeniddictService
    {
        Task<ClaimsPrincipal?> GetClaimsPrincipalByPasswordGrantType(OpenIddictRequest request);
        Task RevokeTokensAsync(string userId);
    }
}
