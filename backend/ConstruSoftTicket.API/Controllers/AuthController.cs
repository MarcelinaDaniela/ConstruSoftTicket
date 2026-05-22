using ContruSoftTicket.Application.DTOs;
using ContruSoftTicket.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ContruSoftTicket.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("registrar")]
    public async Task<IActionResult> Registrar(RegistroDto registroDto)
    {
        try
        {
            var resultado = await _authService.RegistrarUsuario(registroDto);
            return Ok(new { mensaje = resultado });
        }
        catch (Exception ex)
        {
            return BadRequest(new { mensaje = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        try
        {
            var token = await _authService.Login(loginDto);
            return Ok(new { token });
        }
        catch (Exception ex)
        {
            return BadRequest(new { mensaje = ex.Message });
        }
    }
}