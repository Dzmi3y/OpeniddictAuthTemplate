using OpenIddict.Abstractions;
using System.Security.Claims;

namespace OAT.Core.Interfaces
{
    public interface IAuthService
    {
        Task<ClaimsPrincipal?> GetClaimsPrincipalByPasswordGrantType(OpenIddictRequest request);
    }
}
