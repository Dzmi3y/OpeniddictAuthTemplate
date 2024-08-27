using Microsoft.AspNetCore.Mvc;

namespace OAT.AuthApi.Controllers
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
