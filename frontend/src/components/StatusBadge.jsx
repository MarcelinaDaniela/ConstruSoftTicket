export default function StatusBadge({ status }) {
  const statusClass = {
    Abierto: "bg-green-100 text-green-700",
    "En Proceso": "bg-yellow-100 text-yellow-700",
    Cerrado: "bg-gray-200 text-gray-700"
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${statusClass[status] || "bg-blue-100 text-blue-700"}
      `}
    >
      {status}
    </span>
  );
}