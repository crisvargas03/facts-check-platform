using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FactCheckBack.Models.Auth;

namespace FactCheckBack.Business.Services.Authorization
{
    public interface IAuthService
    {
        Task<AuthResponse> RegisterAsync(AuthRequest request);
        Task<AuthResponse> LoginAsync(AuthRequest request);
    }
}
