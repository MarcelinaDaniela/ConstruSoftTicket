using Microsoft.AspNetCore.Mvc;
using ContruSoftTicket.Application.DTOs; 
using ContruSoftTicket.Application.Interfaces; 
using System; // Agregado para que reconozca 'Exception'

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

    // ENDPOINT 1: Crear un nuevo ticket (POST)
    [HttpPost("crear")]
    public IActionResult Crear([FromBody] CreateTicketDto dto)
    {
        try
        {
            // Validamos que los datos cumplan con las reglas (ej. campos requeridos)
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Datos inválidos.",
                    errors = ModelState
                });
            }

            // Limpiamos espacios en blanco al inicio y al final
            dto.Titulo = dto.Titulo.Trim();
            dto.Descripcion = dto.Descripcion.Trim();

            // Enviamos los datos al servicio para que haga la lógica de guardado
            ticketService.CrearTicket(dto);

            return Ok(new
            {
                success = true,
                message = "Ticket registrado correctamente."
            });
        }
        catch (Exception ex)
        {
            // Si algo falla, devolvemos un error 500 para no "romper" la app
            return StatusCode(500, new
            {
                success = false,
                message = "Ocurrió un error interno.",
                detail = ex.Message
            });
        } 
    } // Aquí cerramos el método Crear

    // ENDPOINT 2: Obtener todos los tickets (GET)
    [HttpGet]
    public IActionResult ObtenerTodos()
    {
        // 1. Llamamos al servicio para obtener la lista de tickets
        var tickets = ticketService.ObtenerTickets();

        // 2. Devolvemos un código de éxito (Status 200 OK) con los datos formateados
        return Ok(new
        {
            success = true,
            data = tickets
        });
    }
} // Aquí cerramos la clase TicketController