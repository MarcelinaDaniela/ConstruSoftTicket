using ContruSoftTicket.Domain; // <-- Agregamos esta línea para que reconozca a Usuario
using ContruSoftTicket.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContruSoftTicket.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Ticket> Tickets => Set<Ticket>();
    
    // 👇 ¡Esta es la nueva instrucción para crear la tabla en PostgreSQL!
    public DbSet<Usuario> Usuarios => Set<Usuario>(); 
}