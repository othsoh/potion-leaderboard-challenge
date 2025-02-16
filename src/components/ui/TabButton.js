"use client";

export default function TabButton({
  label,
  isActive,
  onClick,
  activeClass = "bg-[#25223D] border border-[#464558] text-white",
  inactiveClass = "text-gray-400 hover:text-white",
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-3xl text-sm font-medium transition-colors ${
        isActive ? activeClass : inactiveClass
      }`}
    >
      {label}
    </button>
  );
}