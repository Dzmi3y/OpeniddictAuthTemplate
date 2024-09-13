using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OAT.Core.Interfaces
{
    public interface IAccountService
    {
        Task<IdentityResult?> CreateUser(string username, string password);
    }
}
