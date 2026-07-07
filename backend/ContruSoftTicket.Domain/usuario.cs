namespace ContruSoftTicket.Domain;

public class Usuario
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Correo { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty; // ¡Aquí va el hash, no la clave real!
}