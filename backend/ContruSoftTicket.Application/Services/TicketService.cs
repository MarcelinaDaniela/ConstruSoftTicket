using ContruSoftTicket.Application.DTOs;
using  ContruSoftTicket.Application.Interfaces;
using ContruSoftTicket.Domain.  Entities;

namespace ContruSoftTicket.Application.Services;

public class TicketService : ITicketService
    {
        private readonly ITicketRepository repository;

        public TicketService (ITicketRepository repository)
        {
            this.repository = repository ;
        }

        public void CrearTicket(CreateTicketDto dto)
            {
               var ticket = new Ticket
               {
                Id = Guid.NewGuid(),
                Titulo = dto.Titulo,
                Descripcion = dto.Descripcion,
                FechaCreacion = DateTime.UtcNow,
                Estado = "Abierto"
               };

               repository.Add(ticket);
            }
    }