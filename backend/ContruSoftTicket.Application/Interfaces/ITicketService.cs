using ConstruSoftTicket.Application.DTOs;
using ContruSoftTicket.Application.DTOs;

namespace ContruSoftTicket.Application.Interfaces;

public interface ITicketService     {

    void CrearTicket(CreateTicketDto dto);
    
    IEnumerable <TicketResponseDto> ObtenerTickets();
}