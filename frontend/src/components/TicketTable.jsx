import TicketRow from "./TicketRow";

export default function TicketTable({ tickets }) {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full bg-white text-left">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="px-4 py-3">N°</th>
            <th className="px-4 py-3">Código</th>
            <th className="px-4 py-3">Título</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Acción</th>
          </tr>
        </thead>
        
        <tbody>
          {tickets.map((ticket, index) => (
            <TicketRow
              key={ticket.id}
              ticket={ticket}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}