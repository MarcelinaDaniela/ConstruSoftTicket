using ContruSoftTicket.Application.Interfaces;
using ContruSoftTicket.Domain.Entities;
using ContruSoftTicket.Infrastructure.Data;

namespace ContruSoftTicket.Infrastructure.Repositories;

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
context. SaveChanges () ;
}
}