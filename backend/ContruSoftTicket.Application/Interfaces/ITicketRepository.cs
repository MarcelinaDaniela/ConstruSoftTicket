using ContruSoftTicket.Domain.Entities;

namespace ContruSoftTicket.Application.Interfaces;

public interface ITicketRepository
{
    void Add(Ticket ticket);
}