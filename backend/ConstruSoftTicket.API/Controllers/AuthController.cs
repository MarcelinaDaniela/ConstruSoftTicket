using Microsoft.AspNetCore.Mvc;
using ContruSoftTicket.Application.DTOs;
using ContruSoftTicket.Application.Interfaces;

namespace ConstruSoftTicket.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    // Constructor que inyecta el servicio de autenticación
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    // Endpoint para el Registro
    [HttpPost("registrar")]
    public async Task<IActionResult> Registrar([FromBody] RegistroDto dto)
    {
        try
        {
            var resultado = await _authService.RegistrarUsuario(dto);
            return Ok(new 
            { 
                success = true,
                message = resultado 
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new 
            { 
                success = false,
                message = ex.Message 
            });
        }
    }

    // Endpoint para el Inicio de Sesión (Login)
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        try
        {
            var token = await _authService.Login(dto);
            return Ok(new 
            { 
                success = true,
                token = token 
            });
        }
        catch (Exception ex)
        {
            return Unauthorized(new 
            { 
                success = false,
                message = ex.Message 
            });
        }
    }
}