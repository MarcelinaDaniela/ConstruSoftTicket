const API_URL = "http://localhost:5264/api/Ticket/crear";

export async function createTicket(ticketData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ticketData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "No se pudo registrar el ticket."
    );
  }

  return data;
}

export async function getTickets() {
  const response = await fetch(API_URL);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "No se pudo obtener el listado de tickets."
    );
  }

  return data.data;
}