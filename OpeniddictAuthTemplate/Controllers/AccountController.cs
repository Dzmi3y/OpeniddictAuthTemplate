using Microsoft.AspNetCore.Mvc;
using OAT.AuthApi.Contracts.Requests;
using OAT.Core.Interfaces;

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

    }
}
