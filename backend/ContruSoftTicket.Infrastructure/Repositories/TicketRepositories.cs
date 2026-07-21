using ContruSoftTicket.Application.Interfaces;
using ContruSoftTicket.Domain.Entities;
using ContruSoftTicket.Infrastructure.Data;


namespace ConstruSoftTicket.Infrastructure.Repositories
{
    public class TicketRepository : ITicketRepository
    {
        private readonly AppDbContext context;

        public TicketRepository(AppDbContext context)
        {
            this.context = context;
        }

        public void Add(Ticket ticket)
        {
            context.Tickets.Add(ticket);
            context.SaveChanges();
        }

        public IEnumerable<Ticket> ObtenerTodos()
        {
            return context.Tickets
                .OrderByDescending(t => t.FechaCreacion)
                .ToList();
        }
    }
}