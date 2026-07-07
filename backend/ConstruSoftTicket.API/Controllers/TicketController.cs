using Microsoft.AspNetCore.Mvc;
using ContruSoftTicket.Application.DTOs; 
using ContruSoftTicket.Application.Interfaces; 

namespace ConstruSoftTicket.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TicketController : ControllerBase
{
    private readonly ITicketService ticketService;

    public TicketController(ITicketService _ticketService)
    {
        ticketService = _ticketService;
    }

    [HttpPost("crear")]
    public IActionResult Crear([FromBody] CreateTicketDto dto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Datos inválidos.",
                    errors = ModelState
                });
            }

            dto.Titulo = dto.Titulo.Trim();
            dto.Descripcion = dto.Descripcion.Trim();

            ticketService.CrearTicket(dto);

            return Ok(new
            {
                success = true,
                message = "Ticket registrado correctamente."
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                message = "Ocurrió un error interno.",
                detail = ex.Message
            });
        }
    }
}