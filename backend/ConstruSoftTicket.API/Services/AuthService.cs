using ContruSoftTicket.Application.DTOs;
using ContruSoftTicket.Application.Interfaces;
using ContruSoftTicket.Domain;
using ContruSoftTicket.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ConstruSoftTicket.API.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthService(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    public async Task<string> RegistrarUsuario(RegistroDto registroDto)
    {
        var existeUsuario = await _context.Usuarios.AnyAsync(u => u.Correo == registroDto.Correo);
        if (existeUsuario)
            throw new Exception("El correo ya está registrado.");

        string passwordHash = BCrypt.Net.BCrypt.HashPassword(registroDto.Password);

        var nuevoUsuario = new Usuario
        {
            Nombre = registroDto.Nombre,
            Correo = registroDto.Correo,
            PasswordHash = passwordHash 
        };

        _context.Usuarios.Add(nuevoUsuario);
        await _context.SaveChangesAsync();

        return "Usuario registrado con éxito.";
    }

    public async Task<string> Login(LoginDto loginDto)
    {
        var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Correo == loginDto.Correo);
        if (usuario == null)
            throw new Exception("Credenciales incorrectas.");

        bool passwordValida = BCrypt.Net.BCrypt.Verify(loginDto.Password, usuario.PasswordHash);
        if (!passwordValida)
            throw new Exception("Credenciales incorrectas.");

        return GenerarToken(usuario);
    }

    private string GenerarToken(Usuario usuario)
    {
        var jwtSettings = _config.GetSection("Jwt");
        var secretKey = jwtSettings["Key"];
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, usuario.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, usuario.Correo),
            new Claim("nombre", usuario.Nombre) 
        };

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2), 
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}