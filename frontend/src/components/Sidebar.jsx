import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const getLinkClass = ({ isActive }) =>
    `
    flex
    items-center
    gap-3
    px-4
    py-3
    rounded-lg
    text-sm
    font-medium
    transition
    duration-200
    ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }
  `;

  return (
    <aside className="w-72 bg-gray-950 text-white min-h-screen p-6">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight">
          ConstruSoft
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Ticket Manager
        </p>
      </div>

      <nav>
        <p className="text-xs uppercase text-gray-500 font-semibold mb-3">
          Módulos
        </p>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/tickets/create"
              className={getLinkClass}
            >
              <span></span>
              <span>Registro de Tickets</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/tickets"
              end
              className={getLinkClass}
            >
              <span></span>
              <span>Listado de Tickets</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}