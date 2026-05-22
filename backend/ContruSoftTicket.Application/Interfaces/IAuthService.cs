using ContruSoftTicket.Application.DTOs;

namespace ContruSoftTicket.Application.Interfaces;

public interface IAuthService
{
    Task<string> RegistrarUsuario(RegistroDto registroDto);
    Task<string> Login(LoginDto loginDto);
}