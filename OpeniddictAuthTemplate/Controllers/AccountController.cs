using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using System.Security.Claims;
using AuthApi.Identity;
using AuthApi.Config;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AuthApi.Controllers
{
    public class AccountController : ControllerBase
    {
        [HttpPost]
        public IActionResult Register()
        {


            return Ok();
        }
        
    }
}
