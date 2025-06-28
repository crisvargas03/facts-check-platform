using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FactCheckBack.Business.Services.Jwt;
using FactCheckBack.Data.Context;
using FactCheckBack.Models.Auth;
using FactCheckBack.Models.Entities;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using FactCheckBack.Models.Auth;

namespace FactCheckBack.Business.Services.Authorization
{
    public class AuthService : IAuthService
    {
        private readonly FactCheckBackDbContext _context;
        private readonly IJwtService _jwtService;

        public AuthService(FactCheckBackDbContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        public async Task<AuthResponse> RegisterAsync(AuthRequest request)
        {
            var exists = await _context.Users.AnyAsync(u => u.email == request.Email);
            if (exists)
                throw new Exception("El correo ya está registrado.");

            var user = new Users
            {
                user_id = request.user_id,
                email = request.Email,
                user_type_id = "1",
                name = request.name,
                password = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = _jwtService.GenerateToken(user.email, "local");

            return new AuthResponse
            {
                Email = user.email,
                Token = token
            };
        }

        public async Task<AuthResponse> LoginAsync(AuthRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.email == request.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.password))
                throw new Exception("Credenciales inválidas.");

            var token = _jwtService.GenerateToken(user.email, "local");

            return new AuthResponse
            {
                Email = user.email,
                Token = token
            };
        }
    }
}
