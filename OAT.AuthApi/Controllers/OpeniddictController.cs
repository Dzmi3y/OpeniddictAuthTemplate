﻿using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OAT.Core.Interfaces;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using Resources;
using Swashbuckle.AspNetCore.Annotations;
using System.Security.Claims;

namespace OAT.AuthApi.Controllers
{
    public class OpeniddictController : ControllerBase
    {
        private readonly IOpeniddictService _openiddictService;

        public OpeniddictController(IOpeniddictService openiddictService)
        {
            _openiddictService = openiddictService;
        }

        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(SignInResult))]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, Type = typeof(UnauthorizedResult))]
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpPost("~/Account/GetToken")]
        [Consumes("application/x-www-form-urlencoded")]
        [Produces("application/json")]
        public async Task<IActionResult> Exchange()
        {
            var oidRequest = HttpContext.GetOpenIddictServerRequest();

            if (oidRequest.IsPasswordGrantType())
            {
                var claimsPrincipal = await _openiddictService.GetClaimsPrincipalByPasswordGrantType(oidRequest);
                return AuthResult(claimsPrincipal);
            }

            if (oidRequest.IsRefreshTokenGrantType())
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
        [HttpPost("~/Account/Logout")]
        public async Task<IActionResult> Logout()
        {
            string? userId = User.GetClaim(OpenIddictConstants.Claims.Subject);

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest(Resource.IncorrectUserId);
            }

            await HttpContext.SignOutAsync(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);

            await _openiddictService.RevokeTokensAsync(userId);
            return SignOut(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
        }
    }
}
