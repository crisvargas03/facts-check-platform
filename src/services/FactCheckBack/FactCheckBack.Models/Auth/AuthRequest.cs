using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FactCheckBack.Models.Auth
{
    public class AuthRequest
    {
        public string user_id { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string name { get; set; } = string.Empty;
        public string user_type_id { get; set; } = string.Empty;
        
    }
}
