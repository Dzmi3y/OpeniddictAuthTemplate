using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OAT.AuthApi.Contracts.Requests;
using OAT.AuthApi.Contracts.Responses;
using OAT.Core.Interfaces;
using OpenIddict.Abstractions;
using Swashbuckle.AspNetCore.Annotations;

namespace OAT.AuthApi.Controllers
{

    [Route("[controller]/[action]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
        {
            var identityResult = await _accountService.CreateUser(registerRequest.Username, registerRequest.Password);

            if (identityResult == null)
            {
                return BadRequest("User already exists");
            }

            if (identityResult.Succeeded)
            {
                return Ok("User has been successfully created");
            }

            return BadRequest(identityResult.Errors.FirstOrDefault());
        }

        [HttpGet]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(UserDataResponse))]
        [SwaggerResponse(StatusCodes.Status404NotFound)]
        public IActionResult GetUserData()
        {
            var id = User.GetClaim(OpenIddictConstants.Claims.Subject);
            
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("User ID cannot be null or empty");
            }

            if (User.Identity is null)
            {
                return BadRequest("User identity is not available");
            }

            var userData = new UserDataResponse
            {
                Id = id,
                Name = User.Identity.Name,
                Role = User.GetClaim(OpenIddictConstants.Claims.Role)
            };

            return Ok(userData);
        }

    }
}
