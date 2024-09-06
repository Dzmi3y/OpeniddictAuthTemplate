using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using OAT.Core.Interfaces;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using System.Security.Claims;

namespace OAT.AuthApi.Controllers
{
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpPost("~/connect/token")]
        [Consumes("application/x-www-form-urlencoded")]
        [Produces("application/json")]
        public async Task<IActionResult> Exchange()
        {
            var oidcRequest = HttpContext.GetOpenIddictServerRequest();

            if (oidcRequest.IsPasswordGrantType())
            {
                var claimsPrincipal = await _authService.GetClaimsPrincipalByPasswordGrantType(oidcRequest);
                return AuthResult(claimsPrincipal);
            }

            if (oidcRequest.IsRefreshTokenGrantType())
            {
                var authenticateResult =
                    await HttpContext.AuthenticateAsync(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
                var claimsPrincipal = authenticateResult.Principal;
                return AuthResult(claimsPrincipal);
            }

            return BadRequest(new OpenIddictResponse
            {
                Error = OpenIddictConstants.Errors.UnsupportedGrantType
            });
        }

        private IActionResult AuthResult(ClaimsPrincipal? claimsPrincipal)
        {
            return claimsPrincipal != null
                ? SignIn(claimsPrincipal, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme)
                : Unauthorized();

        }
    }
}
