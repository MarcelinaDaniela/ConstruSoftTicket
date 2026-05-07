using ContruSoftTicket.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContruSoftTicket.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Ticket> Tickets => Set<Ticket>();
}