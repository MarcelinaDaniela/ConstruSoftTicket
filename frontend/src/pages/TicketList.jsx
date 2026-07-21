import { useEffect, useState } from "react";

import PageContainer from "../components/PageContainer";
import TicketTable from "../components/TicketTable";

import { getTickets } from "../services/ticketService";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    cargarTickets();
  }, []);

  async function cargarTickets() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const data = await getTickets();

      setTickets(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("No se pudo cargar el listado de tickets.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PageContainer title="Listado de Tickets">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <p className="text-gray-600">
            Consulte las incidencias registradas en el sistema.
          </p>
          
          <p className="text-sm text-gray-400 mt-1">
            Total de tickets: {tickets.length}
          </p>
        </div>

        <button
          onClick={cargarTickets}
          className="
            bg-gray-900
            text-white
            px-4
            py-2
            rounded
            text-sm
            hover:bg-gray-700
            transition
          "
        >
          Actualizar
        </button>
      </div>

      {isLoading && (
        <p className="text-gray-600">
          Cargando tickets...
        </p>
      )}

      {errorMessage && (
        <p className="bg-red-100 text-red-700 p-3 rounded">
          {errorMessage}
        </p>
      )}

      {!isLoading && !errorMessage && tickets.length === 0 && (
        <p className="bg-yellow-100 text-yellow-700 p-3 rounded">
          No existen tickets registrados.
        </p>
      )}

      {!isLoading && !errorMessage && tickets.length > 0 && (
        <TicketTable tickets={tickets} />
      )}
    </PageContainer>
  );
}