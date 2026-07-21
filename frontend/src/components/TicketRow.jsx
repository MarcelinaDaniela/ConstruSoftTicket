import StatusBadge from "./StatusBadge";

export default function TicketRow({ ticket, index }) {
  const ticketCode = `CST-${String(index + 1).padStart(4, "0")}`;

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="px-4 py-4 text-sm text-gray-500">
        {index + 1}
      </td>

      <td className="px-4 py-4">
        <span className="font-mono text-sm text-blue-700 bg-blue-50 px-2 py-1 rounded">
          {ticketCode}
        </span>
      </td>

      <td className="px-4 py-4">
        <p className="font-medium text-gray-800">
          {ticket.titulo}
        </p>
      </td>

      <td className="px-4 py-4">
        <StatusBadge status={ticket.estado} />
      </td>

      <td className="px-4 py-4 text-sm text-gray-600">
        {new Date(ticket.fechaCreacion).toLocaleDateString()}
      </td>

      <td className="px-4 py-4 text-sm">
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          Ver
        </button>
      </td>
    </tr>
  );
}