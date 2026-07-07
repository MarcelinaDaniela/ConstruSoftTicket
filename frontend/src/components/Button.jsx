export default function Button({
  children,
  disabled = false,
  type = "button"
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        font-semibold
        px-4
        py-2
        rounded
        transition
        duration-200
        disabled:bg-gray-400
      "
    >
      {children}
    </button>
  );
}