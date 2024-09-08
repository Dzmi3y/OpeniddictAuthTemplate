using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OAT.AuthApi.Contracts.Responses;
using OAT.Core.Interfaces;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using Swashbuckle.AspNetCore.Annotations;
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

        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(SignInResult))]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, Type = typeof(UnauthorizedResult))]
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

        [Authorize]
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpPost("~/connect/logout")]
        public async Task<IActionResult> Logout()
        {
            string? userId = User.GetClaim(OpenIddictConstants.Claims.Subject);

            
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User ID cannot be null or empty");
            }

            await HttpContext.SignOutAsync(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);

            await _authService.RevokeTokensAsync(userId);
            return SignOut(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
        }
    }
}
