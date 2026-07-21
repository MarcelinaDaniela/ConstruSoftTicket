using System;

namespace ConstruSoftTicket.Application.DTOs
{
    // Esta clase representa los datos de un ticket que enviaremos como respuesta
    public class TicketResponseDto
    {
        // Identificador único del ticket
       public Guid Id { get; set; }

        public string Titulo { get; set; }

        public string Estado { get; set; }

        public DateTime FechaCreacion { get; set; }
    }
}