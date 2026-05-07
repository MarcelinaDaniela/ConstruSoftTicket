import { useState } from "react";

export default function CreateTicket() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Conectando con tu API backend
    const response = await fetch("http://localhost:5264/api/ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titulo,
        descripcion
      })
    });

    if (response.ok) {
      alert("Ticket registrado correctamente");
      setTitulo("");
      setDescripcion("");
    } else {
      alert("Error al registrar el ticket");
    }
  };

  return (
    <div>
      <h1>Registro de Ticket</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
          />
        </div>

        <div>
          <label>Descripción</label>
          <textarea
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
          />
        </div>

        <button type="submit">Registrar ticket</button>
      </form>
    </div>
  );
}