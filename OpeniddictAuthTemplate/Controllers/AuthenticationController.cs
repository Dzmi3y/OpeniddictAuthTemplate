using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using System.Security.Claims;
using OAT.Core.Interfaces;
using OAT.Database.Models.Identity;
using OAT.Core.Services;

namespace OAT.AuthApi.Controllers
{
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("~/connect/token")]
        [Consumes("application/x-www-form-urlencoded")]
        [Produces("application/json")]
        public async Task<IActionResult> Exchange()
        {
            var oidcRequest = HttpContext.GetOpenIddictServerRequest();
            if (oidcRequest.IsPasswordGrantType())
                return await TokensForPasswordGrantType(oidcRequest);

            if (oidcRequest.IsRefreshTokenGrantType())
            {
                // return tokens for refresh token flow
            }


            return BadRequest(new OpenIddictResponse
            {
                Error = OpenIddictConstants.Errors.UnsupportedGrantType
            });
        }

        private async Task<IActionResult> TokensForPasswordGrantType(OpenIddictRequest request)
        {
            var claimsPrincipal = await _authService.GetClaimsPrincipalByPasswordGrantType(request);

            return claimsPrincipal != null
                ? SignIn(claimsPrincipal, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme)
                : Unauthorized();
        }
    }
}
