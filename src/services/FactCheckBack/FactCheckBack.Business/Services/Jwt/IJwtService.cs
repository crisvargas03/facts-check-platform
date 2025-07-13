using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FactCheckBack.Business.Services.Jwt
{
    public interface IJwtService
    {
        string GenerateToken(string email, string provider);
    }
}
